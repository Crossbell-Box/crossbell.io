import { showNotification } from "@mantine/notifications";
import { CharacterEntity } from "crossbell.js";

import { SliceFn } from "../connect-modal/stores/types";

import { fetchAccountInfo } from "../apis";
import { indexer } from "@/utils/crossbell.js";

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
				const character = await indexer.getCharacter(result.characterId);

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

	disconnectEmail() {
		set({ email: null });
	},
});
