import { CharacterPermissionKey } from "crossbell";

export function haveSamePermissions(
	a: CharacterPermissionKey[],
	b: CharacterPermissionKey[] | null | undefined
) {
	const map = getPermissionMap(b ?? []);

	return a.every((permission) => map.has(permission));
}

function getPermissionMap(permissions: CharacterPermissionKey[]) {
	return permissions.reduce((map, permission) => {
		map.set(permission, true);
		return map;
	}, new Map<string, boolean>());
}
