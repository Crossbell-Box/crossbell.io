import { useToggleCharacterOperator } from "../character-operator";
import { useAccountState } from "../account-state";

import { OPERATOR_ADDRESS, X_SYNC_OPERATOR_PERMISSIONS } from "./consts";

export function useToggleCharacterSyncOperator(): ReturnType<
	typeof useToggleCharacterOperator
> {
	const isEmail = useAccountState((s) => s.computed.account?.type === "email");
	const [{ hasPermissions, toggleOperator }, mutation] =
		useToggleCharacterOperator(OPERATOR_ADDRESS, X_SYNC_OPERATOR_PERMISSIONS);

	return [
		{
			hasPermissions: isEmail ? true : hasPermissions,
			toggleOperator,
		},
		mutation,
	];
}
