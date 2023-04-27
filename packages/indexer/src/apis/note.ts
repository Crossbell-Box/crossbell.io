import { indexer } from "../indexer";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useAddress } from "@crossbell/contract";

import { NoteLinkType } from "./types";

const SCOPE_KEY = ["indexer", "notes"];

// fetch notes for a character

export const SCOPE_KEY_NOTES_OF_CHARACTER = (characterId: number) => {
	return [...SCOPE_KEY, "list", characterId];
};
export function useNotesOfCharacter(characterId?: number) {
	return useInfiniteQuery(
		SCOPE_KEY_NOTES_OF_CHARACTER(characterId!),
		({ pageParam }) =>
			indexer.getNotes({ characterId, cursor: pageParam, limit: 20 }),
		{
			enabled: Boolean(characterId),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}

// fetch notes
export type UseNotesConfig = Omit<
	Parameters<typeof indexer.getNotes>[0],
	"cursor"
>;
export const SCOPE_KEY_NOTES = (config?: UseNotesConfig) => {
	return [...SCOPE_KEY, "list", "all", config];
};
export function useNotes(config?: UseNotesConfig) {
	return useInfiniteQuery(
		SCOPE_KEY_NOTES(config),
		({ pageParam }) =>
			indexer.getNotes({
				cursor: pageParam,
				limit: 20,
				...config,
			}),
		{
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}

// fetch notes for a note - used for comments

export function fetchNotesForNote(
	characterId: number,
	noteId: number,
	cursor: string
) {
	return indexer.getNotes({
		toCharacterId: characterId,
		toNoteId: noteId,
		cursor,
		limit: 20,
	});
}
export const SCOPE_KEY_NOTES_OF_NOTE = (
	characterId: number,
	noteId: number
) => [...SCOPE_KEY, "list", characterId, noteId];
export function useNotesForNote(characterId: number, noteId: number) {
	return useInfiniteQuery(
		SCOPE_KEY_NOTES_OF_NOTE(characterId, noteId),
		({ pageParam }) => fetchNotesForNote(characterId, noteId, pageParam),
		{
			enabled: Boolean(characterId && noteId),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}

// fetch a single note

export function fetchNote(characterId: number, noteId: number) {
	return indexer.getNote(characterId, noteId);
}
export const SCOPE_KEY_NOTE = (characterId: number, noteId: number) => {
	return [...SCOPE_KEY, "one", characterId, noteId];
};
export function useNote(
	characterId: number,
	noteId: number,
	options: any = {}
) {
	return useQuery(
		SCOPE_KEY_NOTE(characterId, noteId),
		() => fetchNote(characterId, noteId),
		{
			enabled: Boolean(characterId && noteId),
			...options,
		}
	);
}

// fetch note's status

export const SCOPE_KEY_NOTE_STATUS = (characterId: number, noteId: number) => {
	return [...SCOPE_KEY, "status", characterId, noteId];
};
export function useNoteStatus(characterId: number, noteId: number) {
	const address = useAddress();

	return useQuery(
		SCOPE_KEY_NOTE_STATUS(characterId, noteId),
		async () => {
			const [commentCount, mintCount, isMinted] = await Promise.all([
				// comment count
				indexer.getNotes({
					toCharacterId: characterId,
					toNoteId: noteId,
					limit: 0,
				}),

				// mint count
				indexer.getMintedNotesOfNote(characterId, noteId, {
					limit: 0,
				}),

				// minted by me
				address
					? indexer
							.getMintedNotesOfAddress(address, {
								limit: 0,
								noteCharacterId: characterId,
								noteId: noteId,
							})
							.then((res) => res.count > 0)
					: false,
			]);

			return {
				commentCount: commentCount.count,
				mintCount: mintCount.count,
				isMinted,
			};
		},
		{ enabled: Boolean(characterId && noteId) }
	);
}

// fetch a note's minted count

export const SCOPE_KEY_NOTE_MINTED_COUNT = (
	characterId: number,
	noteId: number
) => {
	return [...SCOPE_KEY, "minted_count", characterId, noteId];
};
export function useNoteMintedCount(characterId: number, noteId: number) {
	return useQuery(
		SCOPE_KEY_NOTE_MINTED_COUNT(characterId, noteId),
		async () => {
			const { count } = await indexer.getMintedNotesOfNote(
				characterId,
				noteId,
				{
					limit: 0,
				}
			);
			return count;
		}
	);
}

export const SCOPE_KEY_NOTE_LIKES = (characterId: number, noteId: number) => {
	return [...SCOPE_KEY, "likes", characterId, noteId];
};
export function useNoteLikes(characterId: number, noteId: number) {
	return useInfiniteQuery(
		SCOPE_KEY_NOTE_LIKES(characterId, noteId),
		({ pageParam }) =>
			indexer.getBacklinksOfNote(characterId, noteId, {
				linkType: NoteLinkType.like,
				limit: 20,
				cursor: pageParam,
			}),
		{
			enabled: Boolean(characterId && noteId),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}

export const SCOPE_KEY_NOTE_MINTS = (characterId: number, noteId: number) => {
	return [...SCOPE_KEY, "mints", characterId, noteId];
};
export function useNoteMints(characterId: number, noteId: number) {
	return useInfiniteQuery(
		SCOPE_KEY_NOTE_MINTS(characterId, noteId),
		({ pageParam }) =>
			indexer.getMintedNotesOfNote(characterId, noteId, {
				limit: 20,
				cursor: pageParam,
				order: "asc",
			}),
		{
			enabled: Boolean(characterId && noteId),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}
