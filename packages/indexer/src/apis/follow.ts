import { useInfiniteQuery } from "@tanstack/react-query";

import { indexer } from "../indexer";
import { CharacterLinkType } from "./types";

const SCOPE_KEY = ["indexer", "characters"];

export const SCOPE_KEY_FOLLOWING_CHARACTERS_OF_CHARACTER = ({
	characterId,
}: {
	characterId?: number;
}) => [...SCOPE_KEY, "following", "list", characterId];

export function useFollowingCharactersOfCharacter(characterId?: number) {
	return useInfiniteQuery(
		SCOPE_KEY_FOLLOWING_CHARACTERS_OF_CHARACTER({ characterId }),
		({ pageParam }) =>
			indexer.link.getMany(characterId!, {
				linkType: CharacterLinkType.follow,
				cursor: pageParam,
				limit: 20,
			}),
		{
			enabled: Boolean(characterId),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}

export const SCOPE_KEY_FOLLOWER_CHARACTERS_OF_CHARACTER = ({
	characterId,
}: {
	characterId?: number;
}) => [...SCOPE_KEY, "follower", "list", characterId];

export function useFollowerCharactersOfCharacter(characterId?: number) {
	return useInfiniteQuery(
		SCOPE_KEY_FOLLOWER_CHARACTERS_OF_CHARACTER({ characterId }),
		({ pageParam }) =>
			indexer.link.getBacklinksOfCharacter(characterId!, {
				linkType: CharacterLinkType.follow,
				cursor: pageParam,
				limit: 20,
			}),
		{
			enabled: Boolean(characterId),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}
