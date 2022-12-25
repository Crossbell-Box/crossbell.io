import { useCharacterOperatorHasPermissions } from "../character-operator";
import { useAccountState } from "../account-state";

import { OPERATOR_ADDRESS, X_SYNC_OPERATOR_PERMISSIONS } from "./consts";

export function useCharacterSyncOperatorHasPermissions() {
	const isEmail = useAccountState((s) => s.computed.account?.type === "email");
	const hasPermissions = useCharacterOperatorHasPermissions(
		OPERATOR_ADDRESS,
		X_SYNC_OPERATOR_PERMISSIONS
	);

	return isEmail ? true : hasPermissions;
}
