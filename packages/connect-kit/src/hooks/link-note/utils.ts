import { useQueryClient } from "@tanstack/react-query";
import {
	SCOPE_KEY_NOTE_LIKES,
	SCOPE_KEY_NOTE_STATUS,
} from "@crossbell/indexer";

import { SCOPE_KEY_NOTE_LINK_COUNT } from "./use-note-link-count";
import { SCOPE_KEY_IS_NOTE_LINKED } from "./use-is-note-linked";
import { asyncRetry } from "../../utils";
import { getIsNoteLinked, GetIsNoteLinkedConfig } from "../../apis";

export const updateLinkStatus = async (
	queryClient: ReturnType<typeof useQueryClient>,
	action: "link" | "unlink",
	params: GetIsNoteLinkedConfig
): Promise<boolean> => {
	const countKey = SCOPE_KEY_NOTE_LINK_COUNT({
		characterId: params.toCharacterId,
		noteId: params.toNoteId,
		linkType: params.linkType,
	});

	const isLinkedKey = SCOPE_KEY_IS_NOTE_LINKED(params);

	const count = queryClient.getQueryData<number>(countKey) ?? 0;
	const isLinked =
		(await queryClient.fetchQuery<boolean>(isLinkedKey)) ?? false;

	switch (action) {
		case "link":
			if (!isLinked) {
				queryClient.setQueryData(countKey, Math.max(count + 1, 0));
				queryClient.setQueryData(isLinkedKey, true);
				return true;
			} else {
				return false;
			}
		case "unlink":
			if (isLinked) {
				queryClient.setQueryData(countKey, Math.max(count - 1, 0));
				queryClient.setQueryData(isLinkedKey, false);
				return true;
			} else {
				return false;
			}
	}
};

export function revalidateQueries(
	queryClient: ReturnType<typeof useQueryClient>,
	{ characterId, toCharacterId, toNoteId, linkType }: GetIsNoteLinkedConfig
) {
	return Promise.all([
		queryClient.invalidateQueries(
			SCOPE_KEY_NOTE_LINK_COUNT({
				characterId: toCharacterId,
				noteId: toNoteId,
				linkType,
			})
		),

		queryClient.invalidateQueries(
			SCOPE_KEY_IS_NOTE_LINKED({
				characterId,
				toCharacterId,
				toNoteId,
				linkType,
			})
		),

		queryClient.invalidateQueries(
			SCOPE_KEY_NOTE_LIKES(toCharacterId, toNoteId)
		),

		queryClient.invalidateQueries(
			SCOPE_KEY_NOTE_STATUS(toCharacterId, toNoteId)
		),
	]);
}

export function waitUntilLinkStatusUpdated(
	action: "link" | "unlink",
	config: GetIsNoteLinkedConfig
) {
	return asyncRetry(async (RETRY) => {
		const isLinked = await getIsNoteLinked(config);

		switch (action) {
			case "link":
				return isLinked ? true : RETRY;
			case "unlink":
				return isLinked ? RETRY : true;
		}
	});
}
