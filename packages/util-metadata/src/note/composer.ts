import { NoteMetadata } from "crossbell";

/**
 * @param metadata - the metadata of the note
 * @return a note object with some basic properties.
 */
export const composeNoteMetadata = (
	metadata: NoteMetadata,
	defaultOrigin: string
): NoteMetadata => {
	if (!metadata.tags) {
		metadata.tags = ["crossbell.io"];
		metadata.sources = ["crossbell.io"];
	}

	if (!metadata.external_urls) {
		if (defaultOrigin) {
			metadata.external_urls = [defaultOrigin];
		}
	}

	return metadata;
};
