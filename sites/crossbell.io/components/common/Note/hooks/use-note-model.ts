import React from "react";

import { useToggleLikeNote, useMintNote } from "@crossbell/connect-kit";
import { useNoteStatus } from "@crossbell/indexer";

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

	const {
		isLiked,
		isLoading: isToggleLikeNoteLoading,
		likeCount,
		toggleLike,
	} = useToggleLikeNote({ characterId, noteId });

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
			like: toggleLike,

			isMinted: !!status?.isMinted,
			mintCount: status?.mintCount,
			mint() {
				if (!status?.isMinted && validate({ walletRequired: true })) {
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
			toggleLike,
			validate,
		]
	);
}
