import React from "react";
import { CharacterPermissionKey } from "crossbell.js";

import { useCharacterOperatorPermissions } from "./use-character-operator-permissions";

export type UseCharacterOperatorHasPermissionsOptions = {
	operatorAddress: string;
	permissions: CharacterPermissionKey[];
	characterId: number | null | undefined;
};

export function useCharacterOperatorHasPermissions({
	operatorAddress,
	permissions,
	characterId,
}: UseCharacterOperatorHasPermissionsOptions) {
	const { data } = useCharacterOperatorPermissions({
		operatorAddress,
		characterId,
	});

	const permissionMap = React.useMemo(
		() => getPermissionMap(data ?? []),
		[data]
	);

	return React.useMemo(
		(): boolean =>
			permissions.every((permission) => permissionMap.has(permission)),
		[permissions, permissionMap]
	);
}

function getPermissionMap(permissions: CharacterPermissionKey[]) {
	return permissions.reduce((map, permission) => {
		map.set(permission, true);
		return map;
	}, new Map<string, boolean>());
}
