import { getMiraTokenDecimals } from "../../apis";
import { createAccountTypeBasedMutationHooks } from "../account-type-based-hooks";

import { SCOPE_KEY_TIPS_LIST } from "./use-tip-list";
import { SCOPE_KEY_ACCOUNT_MIRA_BALANCE } from "./use-account-mira-balance";

export const useTip = createAccountTypeBasedMutationHooks<
	void,
	{ characterId: number; noteId?: string | number; amount: number }
>({ actionDesc: "send tip", withParams: false, connectType: "wallet" }, () => ({
	wallet: {
		supportOPSign: false,

		async action({ characterId, noteId, amount }, { contract, account }) {
			if (account.characterId) {
				const decimal = await getMiraTokenDecimals(contract);

				if (noteId) {
					return contract?.tips.tipCharacterForNote(
						account.characterId,
						characterId,
						noteId,
						BigInt(amount) * BigInt(10) ** BigInt(decimal)
					);
				} else {
					return contract?.tips.tipCharacter(
						account.characterId,
						characterId,
						BigInt(amount) * BigInt(10) ** BigInt(decimal)
					);
				}
			}
		},
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
