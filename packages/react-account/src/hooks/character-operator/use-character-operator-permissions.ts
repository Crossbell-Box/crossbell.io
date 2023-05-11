import { useQuery } from "@tanstack/react-query";
import { indexer } from "@crossbell/indexer";
import { CharacterPermissionKey } from "crossbell";
import { type Address } from "viem";

import { SCOPE_KEY_CHARACTER_OPERATOR } from "./const";

export type UseCharacterOperatorPermissionsOptions = {
	operatorAddress: Address;
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
				(await indexer.operator.getForCharacter(characterId, operatorAddress))
					?.permissions ?? null
			);
		},
		{ enabled: !!characterId }
	);
}
