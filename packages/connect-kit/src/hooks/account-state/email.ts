import { showNotification } from "@mantine/notifications";
import { CharacterEntity } from "crossbell.js";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";

import { indexer } from "@crossbell/indexer";

import { useClaimCSBModal } from "../../modals/claim-csb-modal";
import { asyncRetry, SliceFn } from "../../utils";
import { fetchAccountInfo, refillBalance } from "../../apis";

export type EmailAccount = {
	type: "email";
	character: CharacterEntity;
	characterId: number;
	address: undefined;
	token: string;
	email: string;
	csb: string;
	lastCSBRefillTimestamp: number | null;
};

const ONE_DAY_TIMESTAMP = 86400000;

export enum RefillEmailBalanceStatusType {
	ableToRefill = "ableToRefill",
	todayAlreadyRefilled = "todayAlreadyRefilled",
	tooMuchCSB = "tooMuchCSB",
	userNotConnected = "userNotConnected",
}

const RefillEmailBalanceStatusMsg: Record<
	RefillEmailBalanceStatusType,
	string
> = {
	ableToRefill: "Able To Refill",
	todayAlreadyRefilled: "You can only claim CSB once a day.",
	tooMuchCSB: "You can only claim CSB when your CSB is under 0.02.",
	userNotConnected: "User Not Connected",
};

export type EmailAccountSlice = {
	email: EmailAccount | null;

	connectEmail(token: string): Promise<boolean>;
	disconnectEmail(): void;
	refreshEmail(): Promise<boolean>;
	refillEmailBalance(): Promise<boolean>;
	getRefillEmailBalanceStatus(): {
		type: RefillEmailBalanceStatusType;
		msg: string;
	};
	checkIsAbleToRefillEmailBalance(config?: { showTips?: boolean }): boolean;
};

export const createEmailAccountSlice: SliceFn<EmailAccountSlice> = (
	set,
	get
) => ({
	email: null,

	async connectEmail(token: string) {
		const connectError = (message: string) => {
			set({ email: null });
			showNotification({ color: "red", message, title: "Account" });
			return false;
		};

		try {
			const result = await fetchAccountInfo(token);

			if (result.ok) {
				const character = await asyncRetry(async (RETRY) => {
					return (await indexer.getCharacter(result.characterId)) || RETRY;
				});

				if (character) {
					set({
						email: {
							type: "email",
							token,
							address: undefined,
							email: result.email,
							characterId: result.characterId,
							character,
							csb: result.csb,
							lastCSBRefillTimestamp: null,
						},
					});
					return true;
				} else {
					return connectError(`No character for ${result.characterId}`);
				}
			} else {
				return connectError(result.msg);
			}
		} catch (err) {
			return connectError(`${err}`);
		}
	},

	async refreshEmail() {
		const { email } = get();

		if (email) {
			return this.connectEmail(email.token);
		} else {
			return false;
		}
	},

	async refillEmailBalance() {
		const { email, checkIsAbleToRefillEmailBalance } = get();

		if (checkIsAbleToRefillEmailBalance({ showTips: true }) && email) {
			set({ email: { ...email, lastCSBRefillTimestamp: Date.now() } });

			const result = await refillBalance(email);

			if ("balance" in result && result.balance) {
				set({ email: { ...email, csb: result.balance } });
				return true;
			}

			if ("ok" in result) {
				if (result.message) {
					useClaimCSBModal.getState().show(result.message);
				}

				return result.ok;
			}
		}

		return false;
	},

	getRefillEmailBalanceStatus() {
		const { email } = get();

		const type = (() => {
			if (email) {
				const { lastCSBRefillTimestamp, csb } = email;

				if (hasEnoughCsb(csb)) {
					return RefillEmailBalanceStatusType.tooMuchCSB;
				}

				return isMoreThanADaySinceLastClaim(lastCSBRefillTimestamp)
					? RefillEmailBalanceStatusType.ableToRefill
					: RefillEmailBalanceStatusType.todayAlreadyRefilled;
			} else {
				return RefillEmailBalanceStatusType.userNotConnected;
			}
		})();

		return { type, msg: RefillEmailBalanceStatusMsg[type] };
	},

	checkIsAbleToRefillEmailBalance({ showTips } = {}) {
		const status = get().getRefillEmailBalanceStatus();

		switch (status.type) {
			case RefillEmailBalanceStatusType.ableToRefill:
				return true;
			case RefillEmailBalanceStatusType.todayAlreadyRefilled:
			case RefillEmailBalanceStatusType.tooMuchCSB:
			case RefillEmailBalanceStatusType.userNotConnected:
				if (showTips) {
					useClaimCSBModal.getState().show(status.msg);
				}
				return false;
		}
	},

	disconnectEmail() {
		set({ email: null });
	},
});

function isMoreThanADaySinceLastClaim(
	lastCSBRefillTimestamp: EmailAccount["lastCSBRefillTimestamp"]
): boolean {
	if (!lastCSBRefillTimestamp) {
		return true;
	}

	return Date.now() - lastCSBRefillTimestamp > ONE_DAY_TIMESTAMP;
}

function hasEnoughCsb(amountStr: string): boolean {
	const threshold = parseEther("0.02");
	return BigNumber.from(amountStr).gte(threshold);
}
