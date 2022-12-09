const SCOPE_KEY = ["indexer", "operator-sync"];

export const SCOPE_KEY_CHARACTER_OPERATOR = (characterId: number) => {
	return [...SCOPE_KEY, "character-operator", characterId];
};
