import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useContract } from "@/utils/crossbell.js";
import { useAccountCharacter } from "@/components/connectkit";

import {
	SCOPE_KEY_CHARACTER_FOLLOW_RELATION,
	SCOPE_KEY_CHARACTER_FOLLOW_STATS,
} from "../indexer";

export const LinkTypes = {
	follow: "follow",
} as const;

type LinkType = typeof LinkTypes[keyof typeof LinkTypes];

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
