import { useQuery } from "@tanstack/react-query";
import { MarkOptional } from "ts-essentials";

import { getIsNoteLinked, GetIsNoteLinkedConfig } from "../../apis";

export type UseIsNoteLinkedParams = MarkOptional<
	GetIsNoteLinkedConfig,
	"fromCharacterId"
>;

export const SCOPE_KEY_IS_NOTE_LINKED = ({
	fromCharacterId,
	characterId,
	noteId,
	linkType,
}: UseIsNoteLinkedParams) => [
	"connect-kit",
	"is-note-linked",
	linkType,
	characterId,
	noteId,
	fromCharacterId,
];

export function useIsNoteLinked(params: UseIsNoteLinkedParams) {
	return useQuery(
		SCOPE_KEY_IS_NOTE_LINKED(params),
		() =>
			getIsNoteLinked({
				...params,
				fromCharacterId: params.fromCharacterId!,
			}),
		{
			enabled:
				!!params.fromCharacterId && !!params.characterId && !!params.noteId,
		},
	);
}
