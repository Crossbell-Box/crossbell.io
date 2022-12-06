import { indexer } from "@/utils/crossbell.js";

import { useCharacter } from "./character";

const SCOPE_KEY = ["indexer", "operator-sync"];

// get character operator

export const SCOPE_KEY_CHARACTER_OPERATOR = (characterId: number) => {
	return [...SCOPE_KEY, "character-operator", characterId];
};
export function useCharacterOperator(characterId?: number) {
	const { data: character, isLoading } = useCharacter(characterId);

	return {
		data: character?.operators?.[0],
		isLoading,
	};
}
