import { useToggleCharacterOperator } from "../character-operator";

import {
	OP_SIGN_OPERATOR_ADDRESS,
	OP_SIGN_OPERATOR_PERMISSIONS,
} from "./consts";

export type UseToggleOpSignOperatorOptions = {
	characterId: number | null | undefined;
};

export function useToggleOpSignOperator({
	characterId,
}: UseToggleOpSignOperatorOptions): ReturnType<
	typeof useToggleCharacterOperator
> {
	const [{ hasPermissions, toggleOperator }, mutation] =
		useToggleCharacterOperator({
			operatorAddress: OP_SIGN_OPERATOR_ADDRESS,
			permissions: OP_SIGN_OPERATOR_PERMISSIONS,
			characterId,
		});

	return [{ hasPermissions, toggleOperator }, mutation];
}
