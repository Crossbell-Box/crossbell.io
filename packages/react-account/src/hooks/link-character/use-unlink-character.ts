import { CharacterLinkType } from "@crossbell/indexer";

import { unlinkCharacter, siweUnlinkCharacter } from "../../apis";
import {
	AccountTypeBasedMutationOptions,
	createAccountTypeBasedMutationHooks,
} from "../account-type-based-hooks";

export type UnlinkCharacterOptions = AccountTypeBasedMutationOptions<
	typeof useUnlinkCharacter
>;

export const useUnlinkCharacter = createAccountTypeBasedMutationHooks<
	CharacterLinkType,
	{ characterId: number }
>({ actionDesc: "unlinking character", withParams: true }, (linkType) => ({
	email({ characterId }, { account }) {
		return unlinkCharacter({
			token: account.token,
			toCharacterId: characterId,
			linkType,
		});
	},

	wallet: {
		supportOPSign: true,

		async action({ characterId }, { account, siwe, contract }) {
			if (account?.characterId) {
				if (siwe) {
					return siweUnlinkCharacter({
						characterId: account.characterId,
						siwe,
						toCharacterId: characterId,
						linkType,
					});
				} else {
					return contract.link.unlinkCharacter({
						fromCharacterId: account.characterId,
						toCharacterId: characterId,
						linkType: linkType,
					});
				}
			}
		},
	},
}));
