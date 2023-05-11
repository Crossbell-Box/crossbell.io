import { indexer } from "@crossbell/indexer";

import { asyncRetry } from "../../utils";
import { useAccountState } from "../account-state";
import { createAccountTypeBasedMutationHooks } from "../account-type-based-hooks";
import {
	GET_CHARACTER_OPERATORS_SCOPE_KEY,
	SCOPE_KEY_CHARACTER_OPERATOR,
} from "./const";
import { type Address } from "viem";

export const useRemoveCharacterOperator = createAccountTypeBasedMutationHooks<
	void,
	{ characterId: number; operator: Address }
>({ actionDesc: "", withParams: false }, () => ({
	wallet: {
		supportOPSign: false,

		async action({ characterId, operator }, { contract }) {
			await contract.operator.grantForCharacter({
				characterId,
				operator,
				permissions: [],
			});

			await asyncRetry(async (RETRY) => {
				const op = await indexer.operator.getForCharacter(
					characterId,
					operator
				);
				return op?.permissions.length === 0 || RETRY;
			});
		},
	},

	onSuccess({ queryClient, variables }) {
		return Promise.all([
			useAccountState.getState().refresh(),
			queryClient.invalidateQueries(SCOPE_KEY_CHARACTER_OPERATOR(variables)),
			queryClient.invalidateQueries(
				GET_CHARACTER_OPERATORS_SCOPE_KEY(variables)
			),
		]);
	},
}));
