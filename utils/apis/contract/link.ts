import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useContract } from "@/utils/crossbell.js";
import { useAccountCharacter } from "@/components/connectkit";

import {
	SCOPE_KEY_CHARACTER_FOLLOW_RELATION,
	SCOPE_KEY_CHARACTER_FOLLOW_STATS,
	SCOPE_KEY_NOTE_STATUS,
} from "../indexer";

export const LinkTypes = {
	follow: "follow",
	like: "like",
} as const;

type LinkType = typeof LinkTypes[keyof typeof LinkTypes];

// link note

function useLinkNote(characterId: number, noteId: number, linkType: LinkType) {
	const { data: character } = useAccountCharacter();
	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		() => {
			return contract.linkNote(
				character?.characterId!,
				characterId,
				noteId,
				linkType
			);
		},
		{
			onSuccess: () => {
				return queryClient.invalidateQueries(
					SCOPE_KEY_NOTE_STATUS(characterId, noteId)
				);
			},
			onError: (err: any) => {
				showNotification({
					title: "Error while linking note",
					message: err.message,
					color: "red",
				});
			},
		}
	);
}

function useUnlinkNote(
	characterId: number,
	noteId: number,
	linkType: LinkType
) {
	const { data: character } = useAccountCharacter();
	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		() => {
			return contract.unlinkNote(
				character?.characterId!,
				characterId,
				noteId,
				linkType
			);
		},
		{
			onSuccess: () => {
				return queryClient.invalidateQueries(
					SCOPE_KEY_NOTE_STATUS(characterId, noteId)
				);
			},
			onError: (err: any) => {
				showNotification({
					title: "Error while unlinking note",
					message: err.message,
					color: "red",
				});
			},
		}
	);
}

export function useLikeNote(characterId: number, noteId: number) {
	return useLinkNote(characterId, noteId, LinkTypes.like);
}

export function useUnlikeNote(characterId: number, noteId: number) {
	return useUnlinkNote(characterId, noteId, LinkTypes.like);
}

// link character

function useLinkCharacter(
	characterId: number,
	linkType: LinkType,
	options?: any
) {
	const { data: character } = useAccountCharacter();
	const contract = useContract();

	return useMutation(
		() => {
			return contract.linkCharacter(
				character?.characterId!,
				characterId,
				linkType
			);
		},
		{
			onError: (err: any) => {
				showNotification({
					title: "Error while linking character",
					message: err.message,
					color: "red",
				});
			},
			...options,
		}
	);
}

function useUnlinkCharacter(
	characterId: number,
	linkType: LinkType,
	options?: any
) {
	const { data: character } = useAccountCharacter();
	const contract = useContract();

	return useMutation(
		() => {
			return contract.unlinkCharacter(
				character?.characterId!,
				characterId,
				linkType
			);
		},
		{
			onError: (err: any) => {
				showNotification({
					title: "Error while unlinking character",
					message: err.message,
					color: "red",
				});
			},
			...options,
		}
	);
}

export function useFollowCharacter(characterId: number) {
	const { data: character } = useAccountCharacter();
	const queryClient = useQueryClient();

	return useLinkCharacter(characterId, LinkTypes.follow, {
		onSuccess: () => {
			return Promise.all([
				queryClient.invalidateQueries(
					SCOPE_KEY_CHARACTER_FOLLOW_RELATION(
						character?.characterId,
						characterId
					)
				),
				queryClient.invalidateQueries(
					SCOPE_KEY_CHARACTER_FOLLOW_STATS(characterId)
				),
			]);
		},
	});
}

export function useUnfollowCharacter(characterId: number) {
	const { data: character } = useAccountCharacter();
	const queryClient = useQueryClient();

	return useUnlinkCharacter(characterId, LinkTypes.follow, {
		onSuccess: () => {
			return Promise.all([
				queryClient.invalidateQueries(
					SCOPE_KEY_CHARACTER_FOLLOW_RELATION(
						character?.characterId,
						characterId
					)
				),
				queryClient.invalidateQueries(
					SCOPE_KEY_CHARACTER_FOLLOW_STATS(characterId)
				),
			]);
		},
	});
}
