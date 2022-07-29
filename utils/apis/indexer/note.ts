import { indexer } from "@/utils/crossbell.js";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { LinkTypes } from "../contract";
import { useCurrentCharacter } from "./character";

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
			getNextPageParam: (lastPage, allPages) => lastPage.cursor,
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
			getNextPageParam: (lastPage, allPages) => lastPage.cursor,
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
	const { data: currentCharacter } = useCurrentCharacter();
	const { address } = useAccount();

	return useQuery(
		SCOPE_KEY_NOTE_STATUS(characterId, noteId),
		async () => {
			const [commentCount, likeCount, mintCount, isLiked, isMinted] =
				await Promise.all([
					// comment count
					indexer.getNotes({
						toCharacterId: characterId,
						toNoteId: noteId,
						limit: 0,
					}),
					// like count
					indexer.getBacklinksOfNote(characterId, noteId, {
						linkType: LinkTypes.like,
						limit: 0,
					}),
					// mint count
					indexer.getMintedNotesOfNote(characterId, noteId, {
						limit: 0,
					}),
					// liked by me
					currentCharacter?.characterId
						? indexer
								.getLinks(currentCharacter?.characterId, {
									linkType: LinkTypes.like,
									toCharacterId: characterId,
									toNoteId: noteId,
									limit: 0,
								})
								.then((res) => res.count > 0)
						: false,
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
				likeCount: likeCount.count,
				mintCount: mintCount.count,
				isLiked,
				isMinted,
			};
		},
		{ enabled: Boolean(characterId && noteId && currentCharacter?.characterId) }
	);
}
