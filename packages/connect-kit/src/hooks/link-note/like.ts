import { NoteLinkType } from "@crossbell/indexer";

import { useIsNoteLinked, UseIsNoteLinkedParams } from "./use-is-note-linked";
import {
	useNoteLinkCount,
	UseNoteLinkCountParams,
} from "./use-note-link-count";
import {
	useToggleLinkNote,
	UseToggleLinkNoteOptions,
} from "./use-toggle-link-note";
import { useAccountCharacterId, useAccountState } from "@crossbell/connect-kit";
import { MarkOptional } from "ts-essentials";

export function useIsNoteLiked(
	params: MarkOptional<Omit<UseIsNoteLinkedParams, "linkType">, "characterId">
) {
	const { characterId } = useAccountCharacterId();

	return useIsNoteLinked({
		linkType: NoteLinkType.like,
		characterId,
		...params,
	});
}

export function useNoteLikeCount(
	params: MarkOptional<Omit<UseNoteLinkCountParams, "linkType">, "characterId">
) {
	const { characterId } = useAccountCharacterId();

	return useNoteLinkCount({
		linkType: NoteLinkType.like,
		characterId,
		...params,
	});
}

export function useToggleLikeNote(options?: UseToggleLinkNoteOptions) {
	const needInvokeContract = useAccountState(
		(s) => !s.email && !s.wallet?.siwe
	);
	const mutation = useToggleLinkNote(NoteLinkType.like, options);

	return {
		...mutation,
		isPending: needInvokeContract ? mutation.isLoading : false,
	};
}
