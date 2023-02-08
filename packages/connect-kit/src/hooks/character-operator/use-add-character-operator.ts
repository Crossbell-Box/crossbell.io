import { CharacterPermissionKey } from "crossbell.js";

import { useAccountState } from "../account-state";
import { createAccountTypeBasedMutationHooks } from "../account-type-based-hooks";
import { SCOPE_KEY_CHARACTER_OPERATOR } from "./const";

export const useAddCharacterOperator = createAccountTypeBasedMutationHooks<
	void,
	{
		characterId: number;
		operator: string;
		permissions: CharacterPermissionKey[];
	}
>({ actionDesc: "adding operator", withParams: false }, () => ({
	async contract({ characterId, operator, permissions }, { contract }) {
		return contract.grantOperatorPermissionsForCharacter(
			characterId,
			operator,
			permissions
		);
	},

	onSuccess({ queryClient, variables }) {
		return Promise.all([
			useAccountState.getState().refresh(),
			queryClient.invalidateQueries(SCOPE_KEY_CHARACTER_OPERATOR(variables)),
		]);
	},
}));
