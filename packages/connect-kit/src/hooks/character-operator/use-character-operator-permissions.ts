import { useQuery } from "@tanstack/react-query";
import { useContract } from "@crossbell/contract";

import { SCOPE_KEY_CHARACTER_OPERATOR } from "./const";

export type UseCharacterOperatorPermissionsOptions = {
	operatorAddress: string;
	characterId?: number | null;
};

export function useCharacterOperatorPermissions({
	operatorAddress,
	characterId,
}: UseCharacterOperatorPermissionsOptions) {
	const contract = useContract();

	return useQuery(
		SCOPE_KEY_CHARACTER_OPERATOR({ characterId, operator: operatorAddress }),
		async () => {
			if (!characterId) return null;
			return contract
				.getOperatorPermissionsForCharacter(characterId, operatorAddress)
				.then(({ data }) => data);
		},
		{ enabled: !!characterId }
	);
}
