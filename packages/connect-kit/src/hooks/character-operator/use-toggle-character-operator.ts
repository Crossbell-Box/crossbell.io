import React from "react";
import { CharacterPermissionKey } from "crossbell.js";

import { useAccountState } from "../account-state";

import { useCharacterOperatorHasPermissions } from "./use-character-operator-has-permissions";
import { useAddCharacterOperator } from "./use-add-character-operator";
import { useRemoveCharacterOperator } from "./use-remove-character-operator";

export function useToggleCharacterOperator(
	operator: string,
	permissions: CharacterPermissionKey[]
) {
	const characterId = useAccountState((s) => s.computed.account?.characterId);
	const hasPermissions = useCharacterOperatorHasPermissions(
		operator,
		permissions
	);

	const add = useAddCharacterOperator();
	const remove = useRemoveCharacterOperator();
	const mutation = hasPermissions ? remove : add;

	const toggleOperator = React.useCallback(async () => {
		if (characterId) {
			await mutation.mutateAsync({ characterId, operator, permissions });
		}
	}, [mutation, characterId, operator]);

	return [{ hasPermissions, toggleOperator }, mutation] as const;
}
