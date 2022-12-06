import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { indexer } from "@/utils/crossbell.js";

const SCOPE_KEY = ["indexer", "mintedNotes"];

export const SCOPE_KEY_MINTED_NOTE = (
	contractAddress: string,
	tokenId: number
) => {
	return [...SCOPE_KEY, "one", contractAddress, tokenId];
};
export function useMintedNote(contractAddress: string, tokenId: number) {
	return useQuery(
		SCOPE_KEY_MINTED_NOTE(contractAddress, tokenId),
		() => indexer.getMintedNote(contractAddress!, tokenId!),
		{ enabled: Boolean(contractAddress) && Boolean(tokenId) }
	);
}

export const SCOPE_KEY_MINTED_NOTE_OF_ADDRESS = (
	address: string,
	options: { limit?: number } = {}
) => {
	return [...SCOPE_KEY, "address", address, options];
};
export function useMintedNotesOfAddress(address?: string, { limit = 20 } = {}) {
	return useInfiniteQuery(
		SCOPE_KEY_MINTED_NOTE_OF_ADDRESS(address!, { limit }),
		({ pageParam }) =>
			indexer.getMintedNotesOfAddress(address!, {
				cursor: pageParam,
				limit,
			}),
		{
			enabled: Boolean(address),
			getNextPageParam: (lastPage, allPages) => lastPage.cursor,
		}
	);
}

export const SCOPE_KEY_MINTED_NOTE_OF_NOTE = (
	characterId: number,
	noteId: number
) => {
	return [...SCOPE_KEY, "list", characterId, noteId];
};
export function useMintedNotesOfNote(characterId?: number, noteId?: number) {
	return useQuery(
		SCOPE_KEY_MINTED_NOTE_OF_NOTE(characterId!, noteId!),
		({ pageParam }) =>
			indexer.getMintedNotesOfNote(characterId!, noteId!, {
				cursor: pageParam,
				limit: 20,
			}),
		{
			enabled: Boolean(characterId) && Boolean(noteId),
			getNextPageParam: (lastPage, allPages) => lastPage.cursor,
		}
	);
}
