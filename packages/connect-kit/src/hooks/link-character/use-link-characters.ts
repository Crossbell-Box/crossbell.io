import { CharacterLinkType } from "@crossbell/indexer";

import { linkCharacters, siweLinkCharacters } from "../../apis";
import { createAccountTypeBasedMutationHooks } from "../account-type-based-hooks";

export type LinkCharactersOptions = Exclude<
	Parameters<typeof useLinkCharacters>[1],
	undefined
>;

export const useLinkCharacters = createAccountTypeBasedMutationHooks<
	CharacterLinkType,
	{
		characterIds?: number[];
		addresses?: string[];
	}
>({ actionDesc: "linking characters", withParams: true }, (linkType) => ({
	async email({ characterIds, addresses }, { account }) {
		return linkCharacters({
			token: account.token,
			toCharacterIds: characterIds ?? [],
			toAddresses: addresses ?? [],
			linkType,
		});
	},

	async contract({ characterIds, addresses }, { account, contract }) {
		if (account?.characterId) {
			if (account.siwe) {
				return siweLinkCharacters({
					characterId: account.characterId,
					token: account.siwe.token,
					toCharacterIds: characterIds ?? [],
					toAddresses: addresses ?? [],
					linkType,
				});
			} else {
				return contract.linkCharactersInBatch(
					account.characterId,
					characterIds ?? [],
					addresses ?? [],
					linkType
				);
			}
		}
	},
}));
