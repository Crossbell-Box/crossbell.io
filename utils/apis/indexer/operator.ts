import { useQuery } from "@tanstack/react-query";
import { useContract } from "@/utils/crossbell.js";

const SCOPE_KEY = ["indexer", "operator-sync"];

// get character operator

export const SCOPE_KEY_CHARACTER_OPERATOR = (characterId: number) => {
	return [...SCOPE_KEY, "character-operator", characterId];
};
export function useCharacterOperator(characterId?: number) {
	const contract = useContract();
	return useQuery(
		SCOPE_KEY_CHARACTER_OPERATOR(characterId!),
		() => contract.getOperator(characterId!).then((res) => res.data),
		{
			enabled: typeof characterId === "number",
		}
	);
}
