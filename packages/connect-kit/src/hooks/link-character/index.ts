import { useQueryClient } from "@tanstack/react-query";
import React from "react";

import {
	CharacterLinkType,
	SCOPE_KEY_CHARACTER_FOLLOW_RELATION,
	SCOPE_KEY_CHARACTER_FOLLOW_STATS,
} from "@crossbell/indexer";

import { useAccountState } from "../account-state";

import { useLinkCharacter, LinkCharacterOptions } from "./use-link-character";
import { useUnlinkCharacter } from "./use-unlink-character";
import {
	useLinkCharacters,
	LinkCharactersOptions,
} from "./use-link-characters";

export function useFollowCharacter() {
	const queryClient = useQueryClient();
	const currentCharacterId = useAccountState(
		(s) => s.computed.account?.characterId
	);

	const options: LinkCharacterOptions = React.useMemo(
		() => ({
			onSuccess: (_, { characterId }) => {
				return Promise.all(
					invalidateQueries(queryClient, {
						characterId,
						currentCharacterId,
					})
				);
			},
		}),
		[queryClient, currentCharacterId]
	);

	return useLinkCharacter(CharacterLinkType.follow, options);
}

export function useFollowCharacters() {
	const queryClient = useQueryClient();
	const currentCharacterId = useAccountState(
		(s) => s.computed.account?.characterId
	);

	const options: LinkCharactersOptions = React.useMemo(
		() => ({
			onSuccess: (_, { characterIds = [] }) =>
				Promise.all(
					characterIds.flatMap((characterId) =>
						invalidateQueries(queryClient, {
							characterId,
							currentCharacterId,
						})
					)
				),
		}),
		[queryClient, currentCharacterId]
	);

	return useLinkCharacters(CharacterLinkType.follow, options);
}

export function useUnfollowCharacter() {
	const queryClient = useQueryClient();
	const currentCharacterId = useAccountState(
		(s) => s.computed.account?.characterId
	);

	const options: LinkCharacterOptions = React.useMemo(
		() => ({
			onSuccess: (_, { characterId }) =>
				Promise.all(
					invalidateQueries(queryClient, {
						characterId,
						currentCharacterId,
					})
				),
		}),
		[queryClient, currentCharacterId]
	);

	return useUnlinkCharacter(CharacterLinkType.follow, options);
}

function invalidateQueries(
	queryClient: ReturnType<typeof useQueryClient>,
	{
		characterId,
		currentCharacterId,
	}: {
		currentCharacterId: number | undefined;
		characterId: number;
	}
) {
	return [
		queryClient.invalidateQueries(
			SCOPE_KEY_CHARACTER_FOLLOW_RELATION(currentCharacterId, characterId)
		),
		queryClient.invalidateQueries(
			SCOPE_KEY_CHARACTER_FOLLOW_STATS(characterId)
		),
	];
}
