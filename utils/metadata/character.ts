import { CharacterEntity } from "crossbell.js";

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
