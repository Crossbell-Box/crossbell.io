import { useAccountState } from "../account-state";
import { createAccountTypeBasedMutationHooks } from "../account-type-based-hooks";

import { SCOPE_KEY_CHARACTER_OPERATOR } from "./const";

export const useRemoveCharacterOperator = createAccountTypeBasedMutationHooks<
	void,
	{ characterId: number; operator: string }
>({ actionDesc: "", withParams: false }, () => ({
	contract({ characterId, operator }, { contract }) {
		return contract.grantOperatorPermissionsForCharacter(
			characterId,
			operator,
			[]
		);
	},

	onSuccess({ queryClient, variables }) {
		return Promise.all([
			useAccountState.getState().refresh(),
			queryClient.invalidateQueries(
				SCOPE_KEY_CHARACTER_OPERATOR(variables.characterId)
			),
		]);
	},
}));
