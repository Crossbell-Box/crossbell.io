import React from "react";

import {
	useToggleLikeNote,
	useMintNote,
	useIsNoteLiked,
	useNoteLikeCount,
} from "@crossbell/connect-kit";
import { useNoteStatus } from "@crossbell/indexer";
import { useRefCallback } from "@crossbell/util-hooks";

import { useLoginChecker } from "~/shared/wallet/hooks";

export type UseNoteActionsConfig = {
	characterId: number;
	noteId: number;
};

export type NoteModel = {
	characterId: number;
	noteId: number;
	isLoading: boolean;
	commentCount?: number;

	isLiked: boolean;
	likeCount?: number;
	like: () => void;

	isMinted: boolean;
	mintCount?: number;
	mint: () => void;
};

export function useNoteModel({ characterId, noteId }: UseNoteActionsConfig) {
	const { data: status } = useNoteStatus(characterId, noteId);
	const { data: isLiked } = useIsNoteLiked({
		toNoteId: noteId,
		toCharacterId: characterId,
	});
	const { data: likeCount } = useNoteLikeCount({ characterId, noteId });
	const { isPending: isToggleLikeNoteLoading, mutate } = useToggleLikeNote();

	const like = useRefCallback(() =>
		mutate({ characterId, noteId, action: isLiked ? "unlink" : "link" })
	);
	const mintNote = useMintNote();

	const { validate } = useLoginChecker();

	return React.useMemo(
		(): NoteModel => ({
			characterId,
			noteId,
			isLoading: isToggleLikeNoteLoading || mintNote.isLoading,

			commentCount: status?.commentCount,

			isLiked: !!isLiked,
			likeCount,
			like,

			isMinted: !!status?.isMinted,
			mintCount: status?.mintCount,
			mint() {
				if (!status?.isMinted) {
					mintNote.mutate({ characterId, noteId });
				}
			},
		}),
		[
			characterId,
			isLiked,
			isToggleLikeNoteLoading,
			likeCount,
			mintNote,
			noteId,
			status?.commentCount,
			status?.isMinted,
			status?.mintCount,
			like,
			validate,
		]
	);
}
