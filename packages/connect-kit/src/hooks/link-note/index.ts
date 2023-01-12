import { NoteLinkType } from "@crossbell/indexer";

import { useLinkNote, UseLinkNoteOptions } from "./use-link-note";
import { useUnlinkNote } from "./use-unlink-note";

export function useLikeNote(options?: UseLinkNoteOptions) {
	return useLinkNote(NoteLinkType.like, options);
}

export function useUnlikeNote() {
	return useUnlinkNote(NoteLinkType.like);
}
