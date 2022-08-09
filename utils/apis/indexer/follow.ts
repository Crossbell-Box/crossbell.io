import { useInfiniteQuery } from "@tanstack/react-query";
import { indexer } from "@/utils/crossbell.js";
import { LinkTypes } from "@/utils/apis/contract";

const SCOPE_KEY = ["indexer", "characters"];

export function useFollowingCharactersOfCharacter(characterId?: number) {
	return useInfiniteQuery(
		[...SCOPE_KEY, "following", "list", characterId],
		({ pageParam }) =>
			indexer.getLinks(characterId!, {
				linkType: LinkTypes.follow,
				cursor: pageParam,
				limit: 20,
			}),
		{
			enabled: Boolean(characterId),
			getNextPageParam: (lastPage, allPages) => lastPage.cursor,
		}
	);
}

export function useFollowerCharactersOfCharacter(characterId?: number) {
	return useInfiniteQuery(
		[...SCOPE_KEY, "follower", "list", characterId],
		({ pageParam }) =>
			indexer.getBacklinksOfCharacter(characterId!, {
				linkType: LinkTypes.follow,
				cursor: pageParam,
				limit: 20,
			}),
		{
			enabled: Boolean(characterId),
			getNextPageParam: (lastPage, allPages) => lastPage.cursor,
		}
	);
}
