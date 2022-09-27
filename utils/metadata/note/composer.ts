import { getOrigin } from "@/utils/url";
import { NoteMetadata } from "crossbell.js";

/**
 * @param metadata - the metadata of the note
 * @return a note object with some basic properties.
 */
export const composeNoteMetadata = (metadata: NoteMetadata): NoteMetadata => {
	if (!metadata.tags) {
		metadata.tags = ["crossbell.io"];
		metadata.sources = ["crossbell.io"];
	}

	if (!metadata.external_urls) {
		const origin = getOrigin();
		if (origin) {
			metadata.external_urls = [origin];
		}
	}

	return metadata;
};
