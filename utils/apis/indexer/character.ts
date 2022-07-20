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
export function useCharacter(characterId?: number | null) {
	return useQuery(
		SCOPE_KEY_CHARACTER(characterId),
		() => indexer.getCharacter(characterId!),
		{ enabled: Boolean(characterId) }
	);
}

// get a single character by handle

export const SCOPE_KEY_CHARACTER_BY_HANDLE = (handle?: string) => {
	return [...SCOPE_KEY, "one", "@handle", handle];
};
export function useCharacterByHandle(handle?: string) {
	return useQuery(
		SCOPE_KEY_CHARACTER_BY_HANDLE(handle),
		() => indexer.getCharacterByHandle(handle!),
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

export function useCurrentCharacterId() {
	return useLocalStorage<number>({
		key: "currentCharacterId",
		serialize: (cid) => cid.toString(),
	});
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
	return useQuery(
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
}
