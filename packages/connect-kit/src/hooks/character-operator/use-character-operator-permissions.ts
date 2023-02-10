import { useQuery } from "@tanstack/react-query";
import { indexer } from "@crossbell/indexer";
import { CharacterPermissionKey } from "crossbell.js";

import { SCOPE_KEY_CHARACTER_OPERATOR } from "./const";

export type UseCharacterOperatorPermissionsOptions = {
	operatorAddress: string;
	characterId?: number | null;
};

export function useCharacterOperatorPermissions({
	operatorAddress,
	characterId,
}: UseCharacterOperatorPermissionsOptions) {
	return useQuery(
		SCOPE_KEY_CHARACTER_OPERATOR({ characterId, operator: operatorAddress }),
		async (): Promise<CharacterPermissionKey[] | null> => {
			if (!characterId) return null;

			return (
				(await indexer.getCharacterOperator(characterId, operatorAddress))
					?.permissions ?? null
			);
		},
		{ enabled: !!characterId }
	);
}
