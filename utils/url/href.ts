import { composeNoteId } from "./param";

export const composeNoteHref = (characterId: number, noteId: number) => {
	return `/notes/${composeNoteId(characterId, noteId)}`;
};

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
export const composeWalletCharacterEditHref = (characterId: number) => {
	return `/wallet/characters/${characterId}`;
};
