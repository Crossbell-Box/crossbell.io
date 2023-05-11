import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { indexer } from "../indexer";
import { type Address } from "viem";
import { type Numberish } from "crossbell";

const SCOPE_KEY = ["indexer", "mintedNotes"];

export const SCOPE_KEY_MINTED_NOTE = (
	contractAddress: string,
	tokenId: number
) => {
	return [...SCOPE_KEY, "one", contractAddress, tokenId];
};
export function useMintedNote(contractAddress: Address, tokenId: number) {
	return useQuery(
		SCOPE_KEY_MINTED_NOTE(contractAddress, tokenId),
		() => indexer.mintedNote.get(contractAddress!, tokenId!),
		{ enabled: Boolean(contractAddress) && Boolean(tokenId) }
	);
}

export const SCOPE_KEY_MINTED_NOTE_OF_ADDRESS = (
	address: string,
	options: { limit?: Numberish } = {}
) => {
	return [...SCOPE_KEY, "address", address, options];
};
export type UseMintedNotesOfAddressConfig = Parameters<
	(typeof indexer)["mintedNote"]["getManyOfAddress"]
>[1];
export function useMintedNotesOfAddress(
	address?: Address,
	{ limit = 20, ...config }: UseMintedNotesOfAddressConfig = {}
) {
	return useInfiniteQuery(
		SCOPE_KEY_MINTED_NOTE_OF_ADDRESS(address!, { limit }),
		({ pageParam }) =>
			indexer.mintedNote.getManyOfAddress(address!, {
				cursor: pageParam,
				limit,
				...config,
			}),
		{
			enabled: Boolean(address),
			getNextPageParam: (lastPage) => lastPage.cursor,
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
			indexer.mintedNote.getManyOfNote(characterId!, noteId!, {
				cursor: pageParam,
				limit: 20,
			}),
		{
			enabled: Boolean(characterId) && Boolean(noteId),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}
