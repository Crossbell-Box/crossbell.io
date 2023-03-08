const SCOPE_KEY = ["indexer", "operator-sync"];

export const SCOPE_KEY_CHARACTER_OPERATOR = ({
	operator,
	characterId,
}: {
	operator: string;
	characterId: number | undefined | null;
}) => {
	return [...SCOPE_KEY, "character-operator", operator, characterId ?? -1];
};

export const GET_CHARACTER_OPERATORS_SCOPE_KEY = ({
	characterId,
}: {
	characterId: number | undefined | null;
}) => [...SCOPE_KEY, "get-character-operators", characterId];
