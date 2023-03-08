import { useCharacterOperatorHasPermissions } from "../character-operator";
import { useAccountState } from "../account-state";

import { X_SYNC_OPERATOR_ADDRESS, X_SYNC_OPERATOR_PERMISSIONS } from "./consts";

export function useCharacterSyncOperatorHasPermissions() {
	const [isEmail, characterId] = useAccountState((s) => [
		s.computed.account?.type === "email",
		s.computed.account?.characterId,
	]);

	const hasPermissions = useCharacterOperatorHasPermissions({
		operatorAddress: X_SYNC_OPERATOR_ADDRESS,
		permissions: X_SYNC_OPERATOR_PERMISSIONS,
		characterId,
	});

	return isEmail ? true : hasPermissions;
}
