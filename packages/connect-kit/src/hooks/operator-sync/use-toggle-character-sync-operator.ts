import { useToggleCharacterOperator } from "../character-operator";
import { useAccountState } from "../account-state";

import { OPERATOR_ADDRESS, X_SYNC_OPERATOR_PERMISSIONS } from "./consts";

export function useToggleCharacterSyncOperator(): ReturnType<
	typeof useToggleCharacterOperator
> {
	const [isEmail, characterId] = useAccountState((s) => [
		s.computed.account?.type === "email",
		s.computed.account?.characterId,
	]);

	const [{ hasPermissions, toggleOperator }, mutation] =
		useToggleCharacterOperator({
			operatorAddress: OPERATOR_ADDRESS,
			permissions: X_SYNC_OPERATOR_PERMISSIONS,
			characterId,
		});

	return [
		{
			hasPermissions: isEmail ? true : hasPermissions,
			toggleOperator,
		},
		mutation,
	];
}
