import { useQuery } from "@tanstack/react-query";
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

export const SCOPE_KEY_MINTED_NOTE_OF_ADDRESS = (address: string) => {
	return [...SCOPE_KEY, "address", address];
};
export function useMintedNotesOfAddress(address?: string) {
	return useQuery(
		SCOPE_KEY_MINTED_NOTE_OF_ADDRESS(address!),
		() => indexer.getMintedNotesOfAddress(address!),
		{ enabled: Boolean(address) }
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
		() => indexer.getMintedNotesOfNote(characterId!, noteId!),
		{ enabled: Boolean(characterId) && Boolean(noteId) }
	);
}
