import { useCharacterOperatorHasPermissions } from "../character-operator";

import {
	OP_SIGN_OPERATOR_ADDRESS,
	OP_SIGN_OPERATOR_PERMISSIONS,
} from "./consts";
import { useContext } from "@crossbell/react-account";

export type UseOPSignOperatorHasPermissionsOptions = {
	characterId: number | null | undefined;
};

export function useOPSignOperatorHasPermissions(
	options?: UseOPSignOperatorHasPermissionsOptions,
) {
	const { disableOPSign } = useContext();
	const characterOperatorHasPermissions = useCharacterOperatorHasPermissions({
		operatorAddress: OP_SIGN_OPERATOR_ADDRESS,
		permissions: OP_SIGN_OPERATOR_PERMISSIONS,
		characterId: options?.characterId,
	});

	return !disableOPSign && characterOperatorHasPermissions;
}
