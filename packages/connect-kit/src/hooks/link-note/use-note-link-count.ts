import { useQuery } from "@tanstack/react-query";
import { getNoteLinkCount, GetNoteLinkCountParams } from "../../apis";

export type UseNoteLinkCountParams = GetNoteLinkCountParams;

export const SCOPE_KEY_NOTE_LINK_COUNT = ({
	characterId,
	noteId,
	linkType,
}: UseNoteLinkCountParams) => [
	"connect-kit",
	"note-link-count",
	linkType,
	characterId,
	noteId,
];

export function useNoteLinkCount(params: UseNoteLinkCountParams) {
	return useQuery(SCOPE_KEY_NOTE_LINK_COUNT(params), () =>
		getNoteLinkCount(params)
	);
}
