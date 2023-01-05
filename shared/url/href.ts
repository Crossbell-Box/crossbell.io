import config from "../config";
import { composeNoteId } from "./param";

/**
 * The origin of the current page.
 * @returns "https://crossbell.io" or "http://localhost:3000"
 */
export const getOrigin = ({
	forceProductionOrigin,
}: {
	forceProductionOrigin?: boolean;
} = {}) => {
	if (forceProductionOrigin) {
		return "https://crossbell.io";
	}

	return config.domain;
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
export const composeCharacterHref = (handle?: string) => {
	if (handle) {
		return `/${handle.replace(/^([^@])/, "@$1")}`;
	}

	return "/wallet/characters";
};

export const composeXCharHref = (handle?: string) => {
	if (handle) {
		return `${config.xChar.domain}/${handle.replace(/^@/, "")}`;
	}

	return config.xChar.domain;
};

export const composeCharacterFollowHref = (
	handle: string,
	type: "following" | "followers"
) => {
	if (!handle.startsWith("@")) {
		handle = `@${handle}`;
	}

	return `/${handle}/${type}`;
};

export const WalletCharacterManageHref = `${config.domain}/wallet/characters`;
export const WalletCharacterNewHref = `${config.domain}/wallet/characters/new`;
export const ExportCrossbellDataHref = `https://export.crossbell.io/`;

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

/**
 * @example /shop/wallets/0x...
 */
export const composeTreasuresWalletsHref = (address: string) => {
	return `/shop/wallets/${address}`;
};
