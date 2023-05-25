import { CharacterLinkType } from "@crossbell/indexer";

import { getIsLinked, linkCharacter, siweLinkCharacter } from "../../apis";
import {
	AccountTypeBasedMutationOptions,
	createAccountTypeBasedMutationHooks,
} from "../account-type-based-hooks";

export type LinkCharacterOptions = AccountTypeBasedMutationOptions<
	typeof useLinkCharacter
>;

export const useLinkCharacter = createAccountTypeBasedMutationHooks<
	CharacterLinkType,
	{ characterId: number }
>({ actionDesc: "linking character", withParams: true }, (linkType) => ({
	async email({ characterId }, { account }) {
		const isLinked = await getIsLinked({
			fromCharacterId: account.characterId,
			toCharacterId: characterId,
			linkType,
		});

		if (isLinked) return null;

		return linkCharacter({
			token: account.token,
			toCharacterId: characterId,
			linkType,
		});
	},

	wallet: {
		supportOPSign: true,

		async action({ characterId }, { contract, account, siwe }) {
			if (account?.characterId) {
				const isLinked = await getIsLinked({
					fromCharacterId: account.characterId,
					toCharacterId: characterId,
					linkType,
				});

				if (isLinked) return null;

				if (siwe) {
					return siweLinkCharacter({
						characterId: account.characterId,
						siwe,
						toCharacterId: characterId,
						linkType,
					});
				} else {
					return contract.link.linkCharacter({
						fromCharacterId: account.characterId,
						toCharacterId: characterId,
						linkType,
					});
				}
			}
		},
	},
}));
