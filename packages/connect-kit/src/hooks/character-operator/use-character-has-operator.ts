import React from "react";
import { CharacterPermissionKey } from "crossbell.js";

import { useCharacterOperator } from "./use-character-operator";

export function useCharacterHasOperator(
	operatorAddress: string,
	permissions: CharacterPermissionKey[]
) {
	const { data: operator } = useCharacterOperator(operatorAddress);
	const permissionMap = React.useMemo(
		() =>
			permissions.reduce((map, permission) => {
				map.set(permission, true);
				return map;
			}, new Map<string, boolean>()),
		[permissions]
	);

	return React.useMemo((): boolean => {
		if (!operator) return false;
		if (operator.permissions.length < 1) return false;

		return operator.permissions.every((permission) =>
			permissionMap.has(permission)
		);
	}, [operator]);
}
