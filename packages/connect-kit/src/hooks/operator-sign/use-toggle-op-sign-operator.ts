import { useToggleCharacterOperator } from "../character-operator";

import {
	OP_SIGN_OPERATOR_ADDRESS,
	OP_SIGN_OPERATOR_PERMISSIONS,
} from "./consts";

export function useToggleOpSignOperator(): ReturnType<
	typeof useToggleCharacterOperator
> {
	const [{ hasPermissions, toggleOperator }, mutation] =
		useToggleCharacterOperator(
			OP_SIGN_OPERATOR_ADDRESS,
			OP_SIGN_OPERATOR_PERMISSIONS
		);

	return [{ hasPermissions, toggleOperator }, mutation];
}
