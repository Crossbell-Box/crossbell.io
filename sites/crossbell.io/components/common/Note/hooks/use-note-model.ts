import React from "react";

import {
	useToggleLikeNote,
	useMintNote,
	useIsNoteLiked,
	useNoteLikeCount,
} from "@crossbell/connect-kit";
import { useNoteStatus } from "@crossbell/indexer";
import { useRefCallback } from "@crossbell/util-hooks";
import { useAddress } from "@crossbell/contract";

import { useLoginChecker } from "~/shared/wallet/hooks";

export type UseNoteActionsConfig = {
	characterId: number;
	noteId: number;
};

export type NoteModel = {
	characterId: number;
	noteId: number;
	isLoading: boolean;
	loadingDescription: string;
	commentCount?: number;

	isLiked: boolean;
	likeCount?: number;
	like: () => void;

	isMinted: boolean;
	mintCount?: number;
	mint: () => void;
};

export function useNoteModel({ characterId, noteId }: UseNoteActionsConfig) {
	const address = useAddress() ?? "";
	const { data: status } = useNoteStatus({ characterId, noteId, address });
	const [{ isLiked }] = useIsNoteLiked({
		noteId,
		characterId,
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
			loadingDescription: mintNote.isLoading ? "Minting..." : "Loading...",

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
