import React from "react";
import { CharacterEntity, NoteEntity } from "crossbell";
import {
	composeNoteId,
	composeScanTxHref,
	composeScanAddressHref,
} from "@crossbell/util-metadata";
import { MarkOptional } from "ts-essentials";

type ComposerFn<T> = (params: T) => string;

export type UrlComposer = {
	characterUrl: ComposerFn<CharacterEntity>;
	noteUrl: ComposerFn<NoteEntity>;
	scanTxUrl: ComposerFn<{ txHash: string }>;
	scanAddressUrl: ComposerFn<{ addressHash: string }>;
};

const defaultComposer: UrlComposer = {
	characterUrl: ({ handle }) => {
		return `https://crossbell.io/${handle.replace(/^([^@])/, "@$1")}`;
	},
	noteUrl: ({ characterId, noteId }) => {
		return `https://crossbell.io/notes/${composeNoteId(characterId, noteId)}`;
	},
	scanTxUrl: ({ txHash }) => composeScanTxHref(txHash),
	scanAddressUrl: ({ addressHash }) => composeScanAddressHref(addressHash),
};

export type UrlComposerContextValue = MarkOptional<
	UrlComposer,
	"scanAddressUrl" | "scanTxUrl"
>;

export const UrlComposerContext =
	React.createContext<UrlComposerContextValue | null>(null);

export function useUrlComposer(): UrlComposer {
	const context = React.useContext(UrlComposerContext);

	return React.useMemo(() => ({ ...defaultComposer, ...context }), [context]);
}
