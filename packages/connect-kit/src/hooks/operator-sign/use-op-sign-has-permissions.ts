import { useCharacterOperatorHasPermissions } from "../character-operator";
import { useAccountState } from "../account-state";

import {
	OP_SIGN_OPERATOR_ADDRESS,
	OP_SIGN_OPERATOR_PERMISSIONS,
} from "./consts";

export function useOpSignHasPermissions() {
	const isEmail = useAccountState((s) => s.computed.account?.type === "email");
	const hasPermissions = useCharacterOperatorHasPermissions(
		OP_SIGN_OPERATOR_ADDRESS,
		OP_SIGN_OPERATOR_PERMISSIONS
	);

	return isEmail ? true : hasPermissions;
}
