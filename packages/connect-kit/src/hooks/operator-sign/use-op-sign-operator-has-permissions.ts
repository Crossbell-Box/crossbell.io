import { useCharacterOperatorHasPermissions } from "../character-operator";

import {
	OP_SIGN_OPERATOR_ADDRESS,
	OP_SIGN_OPERATOR_PERMISSIONS,
} from "./consts";

export type UseOPSignOperatorHasPermissionsOptions = {
	characterId: number | null | undefined;
};

export function useOPSignOperatorHasPermissions({
	characterId,
}: UseOPSignOperatorHasPermissionsOptions) {
	return useCharacterOperatorHasPermissions({
		operatorAddress: OP_SIGN_OPERATOR_ADDRESS,
		permissions: OP_SIGN_OPERATOR_PERMISSIONS,
		characterId,
	});
}
