import { NoteLinkType } from "@crossbell/indexer";
import { MarkOptional } from "ts-essentials";

import { useAccountState } from "../account-state";
import { useAccountCharacterId } from "../use-account-character-id";
import { useIsNoteLinked, UseIsNoteLinkedParams } from "./use-is-note-linked";
import {
	useNoteLinkCount,
	UseNoteLinkCountParams,
} from "./use-note-link-count";
import {
	useToggleLinkNote,
	UseToggleLinkNoteOptions,
} from "./use-toggle-link-note";
import { useNoteLinkList, UseNoteLinkListParams } from "./use-note-link-list";

export function useIsNoteLiked(
	params: MarkOptional<Omit<UseIsNoteLinkedParams, "linkType">, "characterId">
) {
	const { characterId } = useAccountCharacterId();

	const result = useIsNoteLinked({
		linkType: NoteLinkType.like,
		characterId,
		...params,
	});

	return [
		{
			isLiked: !!result.data?.isLinked,
			transactionHash: result.data?.transactionHash,
		},
		result,
	] as const;
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

export function useNoteLikeList(
	params: Omit<UseNoteLinkListParams, "linkType">
) {
	return useNoteLinkList({ ...params, linkType: NoteLinkType.like });
}
