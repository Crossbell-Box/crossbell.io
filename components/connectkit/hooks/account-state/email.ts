import { showNotification } from "@mantine/notifications";
import { CharacterEntity } from "crossbell.js";

import { indexer } from "@/utils/crossbell.js";

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
};

export type EmailAccountSlice = {
	email: EmailAccount | null;

	connectEmail(token: string): Promise<boolean>;
	disconnectEmail(): void;
	refreshEmail(): Promise<boolean>;
	refillEmailBalance(): Promise<boolean>;
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
							csb: result.csb,
							characterId: result.characterId,
							character,
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
		const { email } = get();

		if (email) {
			const result = await refillBalance(email);

			if (result.balance) {
				set({ email: { ...email, csb: result.balance } });
			}

			if (result.message) {
				showNotification({
					color: result.ok ? "green" : "red",
					message: result.message,
					title: "Refill Balance",
				});
			}

			return result.ok;
		} else {
			return false;
		}
	},

	disconnectEmail() {
		set({ email: null });
	},
});
