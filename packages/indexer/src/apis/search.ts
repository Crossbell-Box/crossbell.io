import { indexer } from "../indexer";
import { useInfiniteQuery } from "@tanstack/react-query";

const SCOPE_KEY = ["indexer", "search"];

// search characters

export function useSearchingCharacters(
	query: string,
	{ limit = 20 }: { limit?: number } = {},
	options?: { enabled: boolean }
) {
	return useInfiniteQuery(
		[...SCOPE_KEY, "characters", "list", query, { limit }],
		({ pageParam }) =>
			indexer.search.characters(query, {
				cursor: pageParam,
				limit,
			}),
		{
			enabled: Boolean(query),
			getNextPageParam: (lastPage) => lastPage.cursor,
			...options,
		}
	);
}

// search notes

export function useSearchingNotes(
	query: string,
	{ limit = 20 }: { limit?: number } = {},
	options?: { enabled: boolean }
) {
	return useInfiniteQuery(
		[...SCOPE_KEY, "notes", "list", query, { limit }],
		({ pageParam }) =>
			indexer.search.notes(query, {
				cursor: pageParam,
				limit,
			}),
		{
			enabled: Boolean(query),
			getNextPageParam: (lastPage) => lastPage.cursor,
			...options,
		}
	);
}
