import { CharacterEntity } from "crossbell.js";

import { indexer } from "@/utils/crossbell.js";

import { SliceFn } from "../../connect-modal/stores/types";

export type WalletAccount = {
	type: "wallet";
	character: CharacterEntity | undefined;
	characterId: number | undefined;
	handle: string | undefined;
	address: string;
};

export type WalletAccountSlice = {
	wallet: WalletAccount | null;

	connectWallet(address: string | null): Promise<boolean>;
	refreshWallet(): Promise<boolean>;
	switchCharacter(character: CharacterEntity): void;
};

export const createWalletAccountSlice: SliceFn<WalletAccountSlice> = (
	set,
	get
) => ({
	wallet: null,

	async connectWallet(address) {
		if (address) {
			const character = await indexer.getPrimaryCharacter(address);

			if (character) {
				set({
					wallet: {
						address,
						type: "wallet",
						handle: character.handle,
						characterId: character.characterId,
						character,
					},
				});
				return true;
			} else {
				set({ wallet: null });
				return false;
			}
		} else {
			set({ wallet: null });
			return false;
		}
	},

	async refreshWallet() {
		const { wallet } = get();

		if (wallet?.address) {
			return this.connectWallet(wallet.address);
		} else {
			return false;
		}
	},

	switchCharacter(character: CharacterEntity) {
		const address = get().wallet?.address;

		if (address) {
			set({
				wallet: {
					address,
					type: "wallet",
					handle: character.handle,
					characterId: character.characterId,
					character,
				},
			});
		}

		return true;
	},
});
