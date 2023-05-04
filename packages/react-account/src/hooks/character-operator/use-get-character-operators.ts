import { indexer } from "@crossbell/indexer";
import { useInfiniteQuery } from "@tanstack/react-query";

import { GET_CHARACTER_OPERATORS_SCOPE_KEY } from "./const";

export type UseGetCharacterOperatorsOptions = {
	characterId: number | undefined | null;
	limit?: number;
};

export function useGetCharacterOperators({
	characterId,
	limit = 20,
}: UseGetCharacterOperatorsOptions) {
	return useInfiniteQuery(
		GET_CHARACTER_OPERATORS_SCOPE_KEY({ characterId }),
		({ pageParam }) =>
			indexer.operator.getManyForCharacter(characterId!, {
				limit,
				cursor: pageParam,
			}),
		{
			enabled: Boolean(characterId),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}
