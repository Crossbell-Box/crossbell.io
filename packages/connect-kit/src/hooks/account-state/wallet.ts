import { CharacterEntity } from "crossbell.js";
import { Signer } from "ethers";
import { indexer } from "@crossbell/indexer";

import { isAddressEqual } from "@crossbell/util-ethers";

import { asyncExhaust, SliceFn } from "../../utils";
import { siweGetAccount, siweGetBalance, siweSignIn } from "../../apis";

export type SiweInfo = {
	csb: string;
	token: string;
};

export type WalletAccount = {
	type: "wallet";
	character: CharacterEntity | undefined;
	characterId: number | undefined;
	handle: string | undefined;
	address: string;
	siwe: SiweInfo | undefined;
};

export type WalletAccountSlice = {
	wallet: WalletAccount | null;

	connectWallet(address: string | null): Promise<boolean>;
	refreshWallet(): Promise<boolean>;
	switchCharacter(character: CharacterEntity): void;

	siweSignIn(signer: Signer): Promise<boolean>;
	siweRefresh(token: string): Promise<boolean>;
};

export const createWalletAccountSlice: SliceFn<WalletAccountSlice> = (
	set,
	get
) => {
	const updateSiwe = (siwe: WalletAccount["siwe"]) => {
		const { wallet } = get();

		if (wallet) {
			set({ wallet: { ...wallet, siwe } });
		}
	};

	return {
		wallet: null,

		connectWallet: asyncExhaust(async (address) => {
			if (address) {
				const { wallet } = get();

				const [character] = await Promise.all([
					getDefaultCharacter({ address, characterId: wallet?.characterId }),
					wallet?.address === address && wallet.siwe
						? get().siweRefresh(wallet.siwe.token)
						: updateSiwe(undefined),
				]);

				const siwe = get().wallet?.siwe;

				if (character) {
					set({
						wallet: {
							siwe,
							address,
							type: "wallet",
							handle: character.handle,
							characterId: character.characterId,
							character,
						},
					});
					return true;
				} else {
					set({
						wallet: {
							siwe,
							address,
							type: "wallet",
							handle: undefined,
							characterId: undefined,
							character: undefined,
						},
					});
					return false;
				}
			} else {
				set({ wallet: null });
				return false;
			}
		}),

		async refreshWallet() {
			const { wallet } = get();

			if (wallet?.address) {
				return get().connectWallet(wallet.address);
			} else {
				return false;
			}
		},

		switchCharacter(character: CharacterEntity) {
			const address = get().wallet?.address;
			const siwe = get().wallet?.siwe;

			if (address) {
				set({
					wallet: {
						siwe,
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

		async siweSignIn(signer) {
			const address = get().wallet?.address;

			if (address) {
				const { token } = await siweSignIn(signer);

				if (token) {
					return get().siweRefresh(token);
				} else {
					return false;
				}
			} else {
				return false;
			}
		},

		async siweRefresh(token) {
			const address = get().wallet?.address;

			if (!address || !token) return false;

			const siwe = await getSiweInfo({ token, address });

			updateSiwe(siwe);

			return !!siwe;
		},
	};
};

async function getSiweInfo({
	address,
	token,
}: {
	address: string;
	token: string;
}): Promise<WalletAccount["siwe"]> {
	if (!token) return undefined;

	const [account, { balance: csb }] = await Promise.all([
		siweGetAccount({ token }),
		siweGetBalance({ token }),
	]);

	if (csb && isAddressEqual(account.address, address)) {
		return { token, csb };
	} else {
		return undefined;
	}
}

async function getDefaultCharacter({
	address,
	characterId,
}: {
	address: string;
	characterId?: number | null;
}): Promise<CharacterEntity | null> {
	const character = await (characterId
		? indexer.getCharacter(characterId)
		: indexer.getPrimaryCharacter(address));

	return character ?? (await indexer.getCharacters(address)).list[0] ?? null;
}
