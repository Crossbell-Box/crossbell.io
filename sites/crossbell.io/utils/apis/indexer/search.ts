import { indexer } from "@/utils/crossbell.js";
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
			indexer.searchCharacters(query, {
				cursor: pageParam,
				limit,
			}),
		{
			enabled: Boolean(query),
			getNextPageParam: (lastPage, allPages) => lastPage.cursor,
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
			indexer.searchNotes(query, {
				cursor: pageParam,
				limit,
			}),
		{
			enabled: Boolean(query),
			getNextPageParam: (lastPage, allPages) => lastPage.cursor,
			...options,
		}
	);
}
