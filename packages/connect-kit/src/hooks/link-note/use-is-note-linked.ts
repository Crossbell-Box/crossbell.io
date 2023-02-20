import { useQuery } from "@tanstack/react-query";
import { MarkOptional } from "ts-essentials";

import { getIsNoteLinked, GetIsNoteLinkedConfig } from "../../apis";

export type UseIsNoteLinkedParams = MarkOptional<
	GetIsNoteLinkedConfig,
	"characterId"
>;

export const SCOPE_KEY_IS_NOTE_LINKED = ({
	characterId,
	toCharacterId,
	toNoteId,
	linkType,
}: UseIsNoteLinkedParams) => [
	"connect-kit",
	"is-note-linked",
	linkType,
	toCharacterId,
	toNoteId,
	characterId,
];

export function useIsNoteLinked(params: UseIsNoteLinkedParams) {
	return useQuery(
		SCOPE_KEY_IS_NOTE_LINKED(params),
		() =>
			getIsNoteLinked({
				...params,
				characterId: params.characterId!,
			}),
		{
			enabled:
				!!params.characterId && !!params.toCharacterId && !!params.toNoteId,
		}
	);
}
