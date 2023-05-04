import { CharacterLinkType } from "@crossbell/indexer";

import { linkCharacters, siweLinkCharacters } from "../../apis";
import {
	AccountTypeBasedMutationOptions,
	createAccountTypeBasedMutationHooks,
} from "../account-type-based-hooks";
import { type Address } from "viem";

export type LinkCharactersOptions = AccountTypeBasedMutationOptions<
	typeof useLinkCharacters
>;

export const useLinkCharacters = createAccountTypeBasedMutationHooks<
	CharacterLinkType,
	{
		characterIds?: number[];
		addresses?: Address[];
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

	wallet: {
		supportOPSign: true,

		async action({ characterIds, addresses }, { account, siwe, contract }) {
			if (account?.characterId) {
				if (siwe) {
					return siweLinkCharacters({
						characterId: account.characterId,
						siwe,
						toCharacterIds: characterIds ?? [],
						toAddresses: addresses ?? [],
						linkType,
					});
				} else {
					return contract.link.linkCharactersInBatch(
						account.characterId,
						characterIds ?? [],
						addresses ?? [],
						linkType
					);
				}
			}
		},
	},
}));
