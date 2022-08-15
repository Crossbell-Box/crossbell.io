import { composeNoteId } from "./param";

/**
 * The origin of the current page.
 * @returns "https://indexer.crossbell.io" or "http://localhost:3000"
 */
export const getOrigin = () => {
	if (process.env.NODE_ENV === "production") {
		return "https://indexer.crossbell.io";
	} else {
		return "http://localhost:3000";
	}
};

/**
 * @example "/note/10-38"
 */
export const composeNoteHref = (characterId: number, noteId: number) => {
	return `/notes/${composeNoteId(characterId, noteId)}`;
};

/**
 * @example "song" -> "/@song"
 */
export const composeCharacterHref = (handle: string) => {
	if (handle) {
		if (!handle.startsWith("@")) {
			handle = `@${handle}`;
		}

		return `/${handle}`;
	}

	return "/character";
};

export const WalletCharacterManageHref = `/wallet/characters`;
export const WalletCharacterNewHref = `/wallet/characters/new`;

/**
 * @example "/wallet/characters/10"
 */
export const composeWalletCharacterEditHref = (characterId: number) => {
	return `/wallet/characters/${characterId}`;
};

/**
 * @example "/search?q=something&f=all"
 */
export const composeSearchHref = (
	q: string,
	type: "all" | "characters" | "treasures" | "notes" = "all"
) => {
	return `/search?q=${encodeURIComponent(q)}&f=${type}`;
};
