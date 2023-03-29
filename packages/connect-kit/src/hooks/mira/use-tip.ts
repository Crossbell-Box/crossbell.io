import { getMiraTokenDecimal } from "../../apis";
import { createAccountTypeBasedMutationHooks } from "../account-type-based-hooks";
import { SCOPE_KEY_TIPS_LIST } from "./use-tip-list";

export const useTip = createAccountTypeBasedMutationHooks<
	void,
	{ characterId: number; noteId?: string | number; amount: number }
>({ actionDesc: "send tip", withParams: false, connectType: "wallet" }, () => ({
	async contract({ characterId, noteId, amount }, { contract, account }) {
		if (account.characterId) {
			const decimal = await getMiraTokenDecimal(contract);

			if (noteId) {
				return contract?.tipCharacterForNote(
					account.characterId,
					characterId,
					noteId,
					BigInt(amount) * BigInt(10) ** BigInt(decimal)
				);
			} else {
				return contract?.tipCharacter(
					account.characterId,
					characterId,
					BigInt(amount) * BigInt(10) ** BigInt(decimal)
				);
			}
		}
	},

	onSuccess({ queryClient, variables, account }) {
		const { characterId, noteId } = variables;

		return Promise.all([
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
