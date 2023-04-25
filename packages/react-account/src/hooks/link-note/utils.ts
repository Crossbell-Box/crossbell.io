import { useQueryClient } from "@tanstack/react-query";
import {
	SCOPE_KEY_NOTE_LIKES,
	SCOPE_KEY_NOTE_STATUS,
} from "@crossbell/indexer";

import { SCOPE_KEY_NOTE_LINK_LIST } from "./use-note-link-list";
import { SCOPE_KEY_NOTE_LINK_COUNT } from "./use-note-link-count";
import { SCOPE_KEY_IS_NOTE_LINKED } from "./use-is-note-linked";
import { asyncRetry } from "../../utils";
import {
	getIsNoteLinked,
	GetIsNoteLinkedConfig,
	GetIsNoteLinkedResult,
} from "../../apis";

export type Action = "link" | "unlink";

export const updateLinkStatus = async ({
	queryClient,
	action,
	params,
	noOptimisticallyUpdate,
}: {
	queryClient: ReturnType<typeof useQueryClient>;
	params: GetIsNoteLinkedConfig;
	noOptimisticallyUpdate?: boolean;
	action?: Action;
}): Promise<{ needUpdate: boolean; action: Action }> => {
	const countKey = SCOPE_KEY_NOTE_LINK_COUNT({
		characterId: params.characterId,
		noteId: params.noteId,
		linkType: params.linkType,
	});

	const isLinkedKey = SCOPE_KEY_IS_NOTE_LINKED(params);

	const count =
		queryClient.getQueryData<number>(countKey) ??
		(await queryClient.fetchQuery<number>(countKey));

	const { isLinked } =
		queryClient.getQueryData<GetIsNoteLinkedResult>(isLinkedKey) ??
		(await queryClient.fetchQuery<GetIsNoteLinkedResult>(isLinkedKey));

	const link = () => {
		if (!noOptimisticallyUpdate) {
			queryClient.setQueryData(countKey, count + 1);
			queryClient.setQueryData<GetIsNoteLinkedResult>(isLinkedKey, {
				isLinked: true,
				transactionHash: null,
			});
		}

		return { needUpdate: true, action: "link" } as const;
	};

	const unlink = () => {
		if (!noOptimisticallyUpdate) {
			queryClient.setQueryData(countKey, Math.max(count - 1, 0));
			queryClient.setQueryData<GetIsNoteLinkedResult>(isLinkedKey, {
				isLinked: false,
				transactionHash: null,
			});
		}

		return { needUpdate: true, action: "unlink" } as const;
	};

	switch (action) {
		case "link":
			return isLinked ? { needUpdate: false, action } : link();
		case "unlink":
			return isLinked ? unlink() : { needUpdate: false, action };
		default:
			return isLinked ? unlink() : link();
	}
};

export function revalidateQueries(
	queryClient: ReturnType<typeof useQueryClient>,
	{ fromCharacterId, characterId, noteId, linkType }: GetIsNoteLinkedConfig
) {
	return Promise.all([
		queryClient.invalidateQueries(
			SCOPE_KEY_NOTE_LINK_COUNT({
				characterId,
				noteId,
				linkType,
			})
		),

		queryClient.invalidateQueries(
			SCOPE_KEY_NOTE_LINK_LIST({
				characterId,
				noteId,
				linkType,
			})
		),

		queryClient.invalidateQueries(
			SCOPE_KEY_IS_NOTE_LINKED({
				fromCharacterId,
				characterId,
				noteId,
				linkType,
			})
		),

		queryClient.invalidateQueries(SCOPE_KEY_NOTE_LIKES(characterId, noteId)),

		queryClient.invalidateQueries(SCOPE_KEY_NOTE_STATUS(characterId, noteId)),
	]);
}

export function waitUntilLinkStatusUpdated(
	action: "link" | "unlink",
	config: GetIsNoteLinkedConfig
) {
	return asyncRetry(async (RETRY) => {
		const { isLinked } = await getIsNoteLinked(config);

		switch (action) {
			case "link":
				return isLinked ? true : RETRY;
			case "unlink":
				return isLinked ? RETRY : true;
		}
	});
}
