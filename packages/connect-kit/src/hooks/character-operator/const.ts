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
