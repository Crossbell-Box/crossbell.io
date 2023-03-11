const SCOPE_KEY = ["indexer", "operator-sync"];

export const NEWBIE_VILLA_OPERATOR_ADDRESS =
	"0x51e2368d60bc329dbd5834370c1e633be60c1d6d";

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
