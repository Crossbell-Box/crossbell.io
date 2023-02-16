import { NoteLinkType } from "@crossbell/indexer";

import { useLinkNote, UseLinkNoteOptions } from "./use-link-note";
import { useUnlinkNote, UseUnlinkNoteOptions } from "./use-unlink-note";
import { useIsNoteLinked, UseIsNoteLinkedParams } from "./use-is-note-linked";
import {
	useNoteLinkCount,
	UseNoteLinkCountParams,
} from "./use-note-link-count";

export function useLikeNote(options?: UseLinkNoteOptions) {
	return useLinkNote(NoteLinkType.like, options);
}

export function useUnlikeNote(options?: UseUnlinkNoteOptions) {
	return useUnlinkNote(NoteLinkType.like, options);
}

export function useIsNoteLiked(
	params: Omit<UseIsNoteLinkedParams, "linkType">
) {
	return useIsNoteLinked({ linkType: NoteLinkType.like, ...params });
}

export function useNoteLikeCount(
	params: Omit<UseNoteLinkCountParams, "linkType">
) {
	return useNoteLinkCount({ linkType: NoteLinkType.like, ...params });
}
