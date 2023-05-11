import { CharacterEntity, CharacterMetadata } from "crossbell";
import { truncateAddress } from "@crossbell/util-ethers";

export function extractCharacterName(
	character: CharacterEntity | null | undefined,
	{ fallbackToHandle }?: { fallbackToHandle?: true }
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

	if (fallbackToHandle && character?.handle) {
		if (character.handle.length > 31) {
			// is address
			return truncateAddress(character.handle);
		} else {
			return character.handle;
		}
	}

	return undefined;
}

export function extractCharacterAvatars(
	character: CharacterEntity | null | undefined
): string[] {
	const avatars = character?.metadata?.content?.avatars;

	return avatars ?? [];
}
export function extractCharacterAvatar(
	character: CharacterEntity | null | undefined
): string | undefined {
	const avatars = extractCharacterAvatars(character);

	return avatars[0];
}

export function extractCharacterBanners(
	character: CharacterEntity | null | undefined
): Required<CharacterMetadata>["banners"] {
	return character?.metadata?.content?.banners ?? [];
}
