import React from "react";
import { CharacterEntity, LinkEntity } from "crossbell";
import { useInfiniteQuery } from "@tanstack/react-query";
import { indexer, NoteLinkType } from "@crossbell/indexer";

import { useAccountCharacter } from "../use-account-character";
import { useIsNoteLinked } from "./use-is-note-linked";

export type UseNoteLinkListParams = {
	characterId: number;
	noteId: number;
	linkType: NoteLinkType;
};

export type NoteLinkListItem = {
	character: CharacterEntity | null;
	characterId: CharacterEntity["characterId"] | null;
	transactionHash: string | null;
	entity: LinkEntity | null;
};

export const SCOPE_KEY_NOTE_LINK_LIST = ({
	linkType,
	characterId,
	noteId,
}: UseNoteLinkListParams) => {
	return ["connect-kit", "note-link-list", linkType, characterId, noteId];
};

export function useNoteLinkList(params: UseNoteLinkListParams) {
	const query = useInfiniteQuery(
		SCOPE_KEY_NOTE_LINK_LIST(params),
		({ pageParam }) =>
			indexer.link.getBacklinksByNote(params.characterId, params.noteId, {
				linkType: params.linkType,
				limit: 20,
				cursor: pageParam,
			}),
		{
			enabled: !!(params.characterId && params.noteId && params.linkType),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
	const currentCharacter = useAccountCharacter();
	const { data } = useIsNoteLinked({
		fromCharacterId: currentCharacter?.characterId,
		noteId: params.noteId,
		characterId: params.characterId,
		linkType: params.linkType,
	});

	const list = React.useMemo((): NoteLinkListItem[] => {
		const list_: NoteLinkListItem[] = (
			query.data?.pages?.flatMap(({ list }) => list) ?? []
		).map((entity) => ({
			characterId: entity.fromCharacterId ?? null,
			character: entity.fromCharacter ?? null,
			transactionHash: entity.transactionHash ?? null,
			entity,
		}));

		if (data?.transactionHash === null) {
			const filteredList = list_.filter(
				({ character }) =>
					character?.characterId !== currentCharacter?.characterId
			);

			if (data.isLinked) {
				return [
					{
						character: currentCharacter ?? null,
						characterId: currentCharacter?.characterId ?? null,
						transactionHash: null,
						entity: null,
					},
					...filteredList,
				];
			} else {
				return filteredList;
			}
		} else {
			return list_;
		}
	}, [query, currentCharacter, data]);

	return [list, query] as const;
}
