import { useQueryClient } from "@tanstack/react-query";
import React from "react";

import {
	CharacterLinkType,
	SCOPE_KEY_CHARACTER_FOLLOW_RELATION,
	SCOPE_KEY_CHARACTER_FOLLOW_STATS,
} from "@/utils/apis/indexer";

import { useAccountState } from "../account-state";

import { useLinkCharacter, LinkCharacterOptions } from "./use-link-character";
import { useUnlinkCharacter } from "./use-unlink-character";

export function useFollowCharacter() {
	const queryClient = useQueryClient();
	const currentCharacterId = useAccountState(
		(s) => s.computed.account?.characterId
	);

	const options: LinkCharacterOptions = React.useMemo(
		() => ({
			onSuccess: (_, { characterId }) => {
				return Promise.all([
					queryClient.invalidateQueries(
						SCOPE_KEY_CHARACTER_FOLLOW_RELATION(currentCharacterId, characterId)
					),
					queryClient.invalidateQueries(
						SCOPE_KEY_CHARACTER_FOLLOW_STATS(characterId)
					),
				]);
			},
		}),
		[queryClient, currentCharacterId]
	);

	return useLinkCharacter(CharacterLinkType.follow, options);
}

export function useUnfollowCharacter() {
	const queryClient = useQueryClient();
	const currentCharacterId = useAccountState(
		(s) => s.computed.account?.characterId
	);

	const options: LinkCharacterOptions = React.useMemo(
		() => ({
			onSuccess: (_, { characterId }) => {
				return Promise.all([
					queryClient.invalidateQueries(
						SCOPE_KEY_CHARACTER_FOLLOW_RELATION(currentCharacterId, characterId)
					),
					queryClient.invalidateQueries(
						SCOPE_KEY_CHARACTER_FOLLOW_STATS(characterId)
					),
				]);
			},
		}),
		[queryClient, currentCharacterId]
	);

	return useUnlinkCharacter(CharacterLinkType.follow, options);
}
