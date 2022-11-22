import { LinkType } from "./types";

import { useLinkNote } from "./use-link-note";
import { useUnlinkNote } from "./use-unlink-note";

export function useLikeNote() {
	return useLinkNote(LinkType.like);
}

export function useUnlikeNote() {
	return useUnlinkNote(LinkType.like);
}
