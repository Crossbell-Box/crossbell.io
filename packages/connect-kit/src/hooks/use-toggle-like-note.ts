import { useConnectedAction } from "./use-connected-action";
import {
	useIsNoteLiked,
	useLikeNote,
	useNoteLikeCount,
	useUnlikeNote,
} from "./link-note";
import { useAccountCharacterId } from "./use-account-character-id";
import { useAccountState } from "@crossbell/connect-kit";

export type UseToggleLikeNoteConfig = {
	characterId: number;
	noteId: number;
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
	const { characterId } = useAccountCharacterId();
	const { data: isLiked } = useIsNoteLiked({
		characterId,
		toNoteId: config.noteId,
		toCharacterId: config.characterId,
	});
	const { data: likeCount } = useNoteLikeCount(config);
	const likeNote = useLikeNote();
	const unlikeNote = useUnlikeNote();
	const mutate = (isLiked ? unlikeNote : likeNote).mutate;
	const needInvokeContract = useAccountState(
		(s) => !s.email && !s.wallet?.siwe
	);
	const isLoading = needInvokeContract
		? likeNote.isLoading || unlikeNote.isLoading
		: false;
	const toggleLike = useConnectedAction(() => mutate(config));

	return { toggleLike, likeCount, isLiked, isLoading };
}
