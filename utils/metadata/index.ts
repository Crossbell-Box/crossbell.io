import { CharacterEntity, NoteMetadata } from "crossbell.js";

/**
 * Receives a note metadata and returns a note object with some basic properties.
 */
export const composeNoteMetadata = (metadata: NoteMetadata): NoteMetadata => {
	if (!metadata.tags) {
		metadata.tags = ["crossbell.io"];
		metadata.sources = ["crossbell.io"];
	}

	return metadata;
};

export function extractCharacterName(
	character: CharacterEntity | null | undefined,
	{ fallbackToHandle }?: { fallbackToHandle: true }
): string;
export function extractCharacterName(
	character: CharacterEntity | null | undefined,
	{ fallbackToHandle }: { fallbackToHandle: false }
): string | undefined;
export function extractCharacterName(
	character: CharacterEntity | null | undefined,
	{ fallbackToHandle = true }: { fallbackToHandle?: boolean } = {}
): string | undefined {
	const name = character?.metadata?.content?.name;
	if (name) {
		return name;
	}

	if (fallbackToHandle) {
		return character?.handle;
	}

	return undefined;
}
