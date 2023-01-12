import { NoteLinkType } from "@crossbell/indexer";

import { useLinkNote, UseLinkNoteOptions } from "./use-link-note";
import { useUnlinkNote, UseUnlinkNoteOptions } from "./use-unlink-note";

export function useLikeNote(options?: UseLinkNoteOptions) {
	return useLinkNote(NoteLinkType.like, options);
}

export function useUnlikeNote(options?: UseUnlinkNoteOptions) {
	return useUnlinkNote(NoteLinkType.like, options);
}
