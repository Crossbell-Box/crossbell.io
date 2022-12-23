import { indexer } from "../indexer";
import { FeedType } from "crossbell.js";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

const SCOPE_KEYS = ["indexer", "feeds"];

const TIMELINE_FEED_TYPES: FeedType[] = [
	// "CREATE_CHARACTER",
	FeedType.LINK,
	FeedType.POST_NOTE,
	FeedType.POST_NOTE_FOR_ANY_URI,
	FeedType.POST_NOTE_FOR_NOTE,
	// "TRANSFER_CHARACTER",
	// "TRANSFER_MINTED_NOTE",
	// "UPDATE_CHARACTER_HANDLE",
];

export function useFeedsOfCharacter(characterId: number) {
	return useInfiniteQuery(
		[...SCOPE_KEYS, "list", characterId],
		({ pageParam }) =>
			indexer.getFeedsOfCharacter(characterId, {
				type: TIMELINE_FEED_TYPES,
				cursor: pageParam,
				limit: 20,
			}),
		{
			enabled: Boolean(characterId),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}

export function useFollowingFeedsOfCharacter(characterId?: number) {
	return useInfiniteQuery(
		[...SCOPE_KEYS, "following", "list", characterId],
		({ pageParam }) =>
			indexer.getFollowingFeedsOfCharacter(characterId!, {
				type: TIMELINE_FEED_TYPES,
				cursor: pageParam,
				limit: 20,
			}),
		{
			enabled: Boolean(characterId),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}

export function useFeed(transactionHash: number, logIndex: number) {
	return useQuery(
		[...SCOPE_KEYS, "one", transactionHash, logIndex],
		() => indexer.getNote(transactionHash, logIndex),
		{ enabled: Boolean(transactionHash && typeof logIndex === "number") }
	);
}
