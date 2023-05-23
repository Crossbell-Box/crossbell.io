import type { Numberish } from "crossbell";

import { getMiraTokenDecimals, emailTip } from "../../apis";
import { createAccountTypeBasedMutationHooks } from "../account-type-based-hooks";

import { SCOPE_KEY_TIPS_LIST } from "./use-tip-list";
import { SCOPE_KEY_ACCOUNT_MIRA_BALANCE } from "./use-account-mira-balance";

export const useTip = createAccountTypeBasedMutationHooks<
	void,
	{ characterId: Numberish; noteId?: Numberish; amount: number }
>({ actionDesc: "send tip", withParams: false }, () => ({
	wallet: {
		supportOPSign: false,

		async action({ characterId, noteId, amount }, { contract, account }) {
			if (account.characterId) {
				const decimal = await getMiraTokenDecimals(contract);

				if (noteId) {
					return contract?.tips.tipCharacterForNote({
						fromCharacterId: account.characterId,
						toCharacterId: characterId,
						toNoteId: noteId,
						amount: BigInt(amount) * BigInt(10) ** BigInt(decimal),
					});
				} else {
					return contract?.tips.tipCharacter({
						fromCharacterId: account.characterId,
						toCharacterId: characterId,
						amount: BigInt(amount) * BigInt(10) ** BigInt(decimal),
					});
				}
			}
		},
	},

	async email({ characterId, noteId, amount }, { contract, account }) {
		const decimal = await getMiraTokenDecimals(contract);

		return emailTip({
			token: account.token,
			characterId,
			noteId,
			amount: BigInt(amount) * BigInt(10) ** BigInt(decimal),
		});
	},

	onSuccess({ queryClient, variables, account }) {
		const { characterId, noteId } = variables;

		return Promise.all([
			queryClient.invalidateQueries(
				SCOPE_KEY_ACCOUNT_MIRA_BALANCE({ address: account!.address! })
			),

			queryClient.invalidateQueries(
				SCOPE_KEY_TIPS_LIST({
					toCharacterId: characterId,
					toNoteId: noteId,
					characterId: account?.characterId,
				})
			),
		]);
	},
}));
