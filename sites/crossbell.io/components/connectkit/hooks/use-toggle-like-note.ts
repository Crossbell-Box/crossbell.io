import React from "react";

import { useRefCallback } from "@crossbell/util-hooks";

import { useAccountState } from "./account-state";
import { useLikeNote, useUnlikeNote } from "./link-note";

export type UseToggleLikeNoteConfig = {
	characterId: number;
	noteId: number;
	status?: { isLiked: boolean; likeCount: number };
};

export type UseToggleLikeNoteResult = {
	isLiked?: boolean;
	likeCount?: number;
	toggleLike: () => void;
	isLoading: boolean;
};

export function useToggleLikeNote(
	config: UseToggleLikeNoteConfig
): UseToggleLikeNoteResult {
	const likeNote = useLikeNote();
	const unlikeNote = useUnlikeNote();
	const byEmail = useToggleByEmail(config, { likeNote, unlikeNote });
	const byContract = useToggleContract(config, { likeNote, unlikeNote });
	const isEmail = useAccountState((s) => !!s.email);

	return isEmail ? byEmail : byContract;
}

type InternalConfig = {
	likeNote: ReturnType<typeof useLikeNote>;
	unlikeNote: ReturnType<typeof useUnlikeNote>;
};

function useToggleContract(
	{ status, noteId, characterId }: UseToggleLikeNoteConfig,
	{ likeNote, unlikeNote }: InternalConfig
): UseToggleLikeNoteResult {
	const { mutate, isLoading } = status?.isLiked ? unlikeNote : likeNote;
	const toggleLike = useRefCallback(() => mutate({ noteId, characterId }));

	return {
		isLoading,
		toggleLike,
		likeCount: status?.likeCount,
		isLiked: status?.isLiked,
	};
}

function useToggleByEmail(
	{ characterId, noteId, status }: UseToggleLikeNoteConfig,
	{ likeNote, unlikeNote }: InternalConfig
): UseToggleLikeNoteResult {
	const noop = () => {};
	const [mutation, setMutation] = React.useState({ run: noop });
	const [isLiked, setIsLiked] = React.useState<boolean | undefined>();
	const [likeCount, setLikeCount] = React.useState<number | undefined>();

	React.useEffect(() => {
		const timeout = window.setTimeout(mutation.run, 1000);
		return () => window.clearTimeout(timeout);
	}, [mutation]);

	React.useEffect(() => {
		if (status) {
			setIsLiked(status.isLiked);
		}
		// Update only if `status.isLiked` changed
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status?.isLiked]);

	React.useEffect(() => {
		if (status) {
			setLikeCount(status.likeCount);
		}
		// Update only if `status.likeCount` changed
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status?.likeCount]);

	const toggleLike = useRefCallback(() => {
		if (status) {
			setIsLiked(!isLiked);
			setLikeCount((likeCount ?? 0) + (isLiked ? -1 : 1));
			setMutation({
				async run() {
					try {
						await (isLiked ? unlikeNote : likeNote).mutateAsync({
							characterId,
							noteId,
						});
					} catch (e) {
						setIsLiked(isLiked);
						setLikeCount(likeCount);
					}
				},
			});
		}
	});

	return {
		isLoading: false,
		likeCount,
		isLiked,
		toggleLike,
	};
}
