import { useQuery } from "@tanstack/react-query";
import { indexer } from "@/utils/crossbell.js";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { LinkTypes } from "../contract";

const SCOPE_KEY = ["indexer", "characters"];

// get list of characters by address

export const SCOPE_KEY_CHARACTERS = (address?: string) => {
	return [...SCOPE_KEY, "list", address];
};
export function useCharacters(address?: string) {
	return useQuery(
		SCOPE_KEY_CHARACTERS(address),
		() => indexer.getCharacters(address!),
		{ enabled: Boolean(address) }
	);
}

// get a single character by id

export const SCOPE_KEY_CHARACTER = (characterId?: number | null) => {
	return [...SCOPE_KEY, "one", characterId];
};
export const fetchCharacter = async (characterId: number) => {
	return indexer.getCharacter(characterId);
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
	return indexer.getCharacterByHandle(handle);
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

export const SCOPE_KEY_PRIMARY_CHARACTER = (address?: string) => {
	return [...SCOPE_KEY, "primary", address];
};
export function usePrimaryCharacter<T>(address?: string) {
	return useQuery(
		SCOPE_KEY_PRIMARY_CHARACTER(address),
		() => indexer.getPrimaryCharacter(address!),
		{ enabled: Boolean(address) }
	);
}

// get the current character of the user

const CurrentCharacterIdKey = "currentCharacterId";
export function getCurrentCharacterId() {
	return localStorage.getItem(CurrentCharacterIdKey);
}
export function useCurrentCharacterId() {
	return useLocalStorage<number>({
		key: CurrentCharacterIdKey,
		serialize: (cid) => cid.toString(),
	});
}
export function useDisconnectCurrentCharacter() {
	const disconnect = () => {
		localStorage.removeItem(CurrentCharacterIdKey);
	};
	return { disconnect };
}

export function useCurrentCharacter() {
	const { address } = useAccount();
	const [cid, setCid] = useCurrentCharacterId();

	const query = cid ? useCharacter(cid) : usePrimaryCharacter(address);

	useEffect(() => {
		if (!cid) {
			if (query.data?.characterId) {
				setCid(query.data?.characterId);
			}
		}
	}, [query.data]);

	return query;
}

// check if the current user has a character
export function useHasCharacter() {
	const { data, status, fetchStatus } = useCurrentCharacter();
	const isLoadingCharacter = status === "loading" && fetchStatus !== "idle";
	const hasCharacter = Boolean(data);

	return {
		hasCharacter,
		isLoadingCharacter,
		currentCharacter: data,
	};
}

// get the following status of a character

export const SCOPE_KEY_CHARACTER_FOLLOW_STATS = (characterId?: number) => {
	return [...SCOPE_KEY, "follow", "stats", characterId];
};
export function useCharacterFollowStats(characterId?: number) {
	return useQuery(
		SCOPE_KEY_CHARACTER_FOLLOW_STATS(characterId),
		async () => {
			const [followingCount, followersCount] = await Promise.all([
				indexer
					.getLinks(characterId!, {
						limit: 0,
						linkType: LinkTypes.follow,
					})
					.then((links) => links.count),
				indexer
					.getBacklinksOfCharacter(characterId!, {
						limit: 0,
						linkType: LinkTypes.follow,
					})
					.then((links) => links.count),
			]);

			return {
				followingCount,
				followersCount,
			};
		},
		{ enabled: Boolean(characterId) }
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
	toCharacterID?: number
) {
	const data = useQuery(
		SCOPE_KEY_CHARACTER_FOLLOW_RELATION(fromCharacterId, toCharacterID),
		async () => {
			const [isFollowing, isFollowed] = await Promise.all([
				indexer
					.getLinks(fromCharacterId!, {
						linkType: LinkTypes.follow,
						limit: 0,
						toCharacterId: toCharacterID,
					})
					.then((links) => links.count > 0),
				indexer
					.getLinks(toCharacterID!, {
						linkType: LinkTypes.follow,
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
		{ enabled: Boolean(fromCharacterId && toCharacterID) }
	);

	const isLoadingFollowRelation =
		data.status === "loading" && data.fetchStatus !== "idle";

	return {
		...data,
		/** isLoading */
		isLoadingFollowRelation,
	};
}
