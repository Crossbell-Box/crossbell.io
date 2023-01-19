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

	async contract({ characterId }, { account, contract }) {
		if (account?.characterId) {
			if (account.siwe) {
				return siweUnlinkCharacter({
					characterId: account.characterId,
					token: account.siwe.token,
					toCharacterId: characterId,
					linkType,
				});
			} else {
				return contract.unlinkCharacter(
					account.characterId,
					characterId,
					linkType
				);
			}
		}
	},
}));
