import { NoteLinkType } from "@crossbell/indexer";

import { useLinkNote } from "./use-link-note";
import { useUnlinkNote } from "./use-unlink-note";

export function useLikeNote() {
	return useLinkNote(NoteLinkType.like);
}

export function useUnlikeNote() {
	return useUnlinkNote(NoteLinkType.like);
}
