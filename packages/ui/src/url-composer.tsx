import React from "react";
import { CharacterEntity, NoteEntity } from "crossbell.js";

import { composeCharacterHref, composeNoteHref } from "~/shared/url/href";
import {
	composeScanTxHref,
	composeScanAddressHref,
} from "~/shared/url/href-external";

type ComposerFn<T> = (params: T) => string;

export type UrlComposer = {
	characterUrl: ComposerFn<CharacterEntity>;
	noteUrl: ComposerFn<NoteEntity>;
	scanTxUrl: ComposerFn<{ txHash: string }>;
	scanAddressUrl: ComposerFn<{ addressHash: string }>;
};

const defaultComposer: UrlComposer = {
	characterUrl: ({ handle }) => composeCharacterHref(handle),
	noteUrl: ({ characterId, noteId }) => composeNoteHref(characterId, noteId),
	scanTxUrl: ({ txHash }) => composeScanTxHref(txHash),
	scanAddressUrl: ({ addressHash }) => composeScanAddressHref(addressHash),
};

export const UrlComposerContext =
	React.createContext<Partial<UrlComposer> | null>(null);

export function useUrlComposer(): UrlComposer {
	const context = React.useContext(UrlComposerContext);

	return React.useMemo(() => ({ ...defaultComposer, ...context }), [context]);
}
