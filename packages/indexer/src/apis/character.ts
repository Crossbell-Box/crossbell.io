import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { indexer } from "../indexer";
import { type Address } from "viem";

import { CharacterLinkType } from "./types";

const SCOPE_KEY = ["indexer", "characters"];

// get list of characters by address

export const SCOPE_KEY_CHARACTERS = (address: Address | null | undefined) => {
	return [...SCOPE_KEY, "list", address];
};
export function useCharacters(address?: Address) {
	return useInfiniteQuery(
		SCOPE_KEY_CHARACTERS(address),
		({ pageParam }) =>
			indexer.character.getMany(address!, {
				cursor: pageParam,
				limit: 20,
			}),
		{
			enabled: Boolean(address),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}

// get a single character by id

export const SCOPE_KEY_CHARACTER = (characterId?: number | bigint | null) => {
	return [...SCOPE_KEY, "one", characterId];
};
export const fetchCharacter = async (characterId: number) => {
	return indexer.character.get(characterId);
};
export function useCharacter(characterId?: number | null, options?: any) {
	return useQuery(
		SCOPE_KEY_CHARACTER(characterId),
		() => fetchCharacter(characterId!),
		{
			enabled: Boolean(characterId),
			...options,
		}
	);
}

// get a single character by handle

export const SCOPE_KEY_CHARACTER_BY_HANDLE = (handle?: string) => {
	return [...SCOPE_KEY, "one", "@handle", handle];
};
export const fetchCharacterByHandle = (handle: string) => {
	return indexer.character.getByHandle(handle);
};
export function useCharacterByHandle(handle?: string, options?: any) {
	return useQuery(
		SCOPE_KEY_CHARACTER_BY_HANDLE(handle),
		() => fetchCharacterByHandle(handle!),
		{ enabled: Boolean(handle), ...options }
	);
}

// check if a handle exists

export const SCOPE_KEY_CHARACTER_HANDLE_EXISTS = (handle?: string) => {
	return [...SCOPE_KEY, "one", "handleExists", handle];
};
export const fetchCharacterHandleExists = (handle: string) => {
	handle = handle?.toLowerCase();
	const endpoint = indexer.endpoint;
	return fetch(endpoint + "/graphql", {
		headers: {
			accept: "application/json",
			"content-type": "application/json",
		},
		referrer: "https://indexer.crossbell.io/altair",
		referrerPolicy: "strict-origin-when-cross-origin",
		body: `{"query":"{characters(where:{handle:{equals:\\"${handle}\\"}},take:1){characterId}}"}`,
		method: "POST",
	})
		.then((res) => res.json())
		.then((res) => res.data.characters.length > 0);
};
export function useCharacterHandleExists(handle?: string) {
	return useQuery(
		SCOPE_KEY_CHARACTER_HANDLE_EXISTS(handle),
		() => fetchCharacterHandleExists(handle!),
		{ enabled: Boolean(handle) }
	);
}

// get the primary character of an address

export const SCOPE_KEY_PRIMARY_CHARACTER = (
	address: string | null | undefined
) => {
	return [...SCOPE_KEY, "primary", address];
};

export function usePrimaryCharacter(address?: Address) {
	return useQuery(
		SCOPE_KEY_PRIMARY_CHARACTER(address),
		() => indexer.character.getPrimary(address!),
		{ enabled: Boolean(address) }
	);
}

// get the following status of a character

export const SCOPE_KEY_CHARACTER_FOLLOW_STATS = (characterId?: number) => {
	return [...SCOPE_KEY, "follow", "stats", characterId];
};
export function useCharacterFollowStats(
	characterId?: number,
	options: any = {}
) {
	return useQuery(
		SCOPE_KEY_CHARACTER_FOLLOW_STATS(characterId),
		async () => {
			const [followingCount, followersCount] = await Promise.all([
				indexer.link
					.getMany(characterId!, {
						limit: 0,
						linkType: CharacterLinkType.follow,
					})
					.then((links) => links.count),
				indexer.link
					.getBacklinksOfCharacter(characterId!, {
						limit: 0,
						linkType: CharacterLinkType.follow,
					})
					.then((links) => links.count),
			]);

			return {
				followingCount,
				followersCount,
			};
		},
		{ enabled: Boolean(characterId), ...options }
	);
}

export const SCOPE_KEY_CHARACTER_FOLLOW_RELATION = (
	fromCharacterId?: number,
	toCharacterID?: number
) => {
	return [...SCOPE_KEY, "follow", "relation", fromCharacterId, toCharacterID];
};
export function useCharacterFollowRelation(
	fromCharacterId?: number,
	toCharacterID?: number,
	options: any = {}
) {
	const data = useQuery(
		SCOPE_KEY_CHARACTER_FOLLOW_RELATION(fromCharacterId, toCharacterID),
		async () => {
			const [isFollowing, isFollowed] = await Promise.all([
				indexer.link
					.getMany(fromCharacterId!, {
						linkType: CharacterLinkType.follow,
						limit: 0,
						toCharacterId: toCharacterID,
					})
					.then((links) => links.count > 0),
				indexer.link
					.getMany(toCharacterID!, {
						linkType: CharacterLinkType.follow,
						limit: 0,
						toCharacterId: fromCharacterId,
					})
					.then((links) => links.count > 0),
			]);

			return {
				isFollowing,
				isFollowed,
			};
		},
		{ enabled: Boolean(fromCharacterId && toCharacterID), ...options }
	);

	const isLoadingFollowRelation =
		data.status === "loading" && data.fetchStatus !== "idle";

	return {
		...data,
		/** isLoading */
		isLoadingFollowRelation,
	};
}
