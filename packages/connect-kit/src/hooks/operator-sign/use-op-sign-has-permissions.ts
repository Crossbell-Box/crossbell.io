import { useCharacterOperatorHasPermissions } from "../character-operator";
import { useAccountState } from "../account-state";

import {
	OP_SIGN_OPERATOR_ADDRESS,
	OP_SIGN_OPERATOR_PERMISSIONS,
} from "./consts";

export type UseOpSignHasPermissionsOptions = {
	characterId: number | null | undefined;
};

export function useOpSignHasPermissions({
	characterId,
}: UseOpSignHasPermissionsOptions) {
	const isEmail = useAccountState((s) => s.computed.account?.type === "email");
	const hasPermissions = useCharacterOperatorHasPermissions({
		operatorAddress: OP_SIGN_OPERATOR_ADDRESS,
		permissions: OP_SIGN_OPERATOR_PERMISSIONS,
		characterId,
	});

	return isEmail ? true : hasPermissions;
}
