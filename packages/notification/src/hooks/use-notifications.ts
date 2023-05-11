import React from "react";
import { NotificationTypeKey } from "crossbell";
import { useAccountCharacter } from "@crossbell/react-account";
import { useCharacterNotification, indexer } from "@crossbell/indexer";
import { useRefCallback } from "@crossbell/util-hooks";

import { useReadingState } from "./use-reading-state";

const types: NotificationTypeKey[] = [
	"OPERATOR_ADDED",
	"OPERATOR_REMOVED",
	"LINKED",
	"UNLINKED",
	"NOTE_MINTED",
	"NOTE_POSTED",
	"MENTIONED",
	"TIPPED",
];

export function useNotifications() {
	const { isRead, cache, markRead: _markRead } = useReadingState();
	const character = useAccountCharacter();
	const { data, ...queryResult } = useCharacterNotification(
		character?.characterId,
		types
	);

	const notifications = React.useMemo(
		() => data?.pages.flatMap(({ list }) => list) ?? [],
		[data]
	);

	const total = data?.pages?.[0]?.count ?? 0;

	const isAllRead = React.useMemo(
		() => notifications.every(isRead),
		[notifications, cache]
	);

	const markAllRead = useRefCallback(() => {
		_markRead(notifications);

		if (character) {
			indexer.notification.markAllAsRead(character?.characterId);
		}
	});

	return { notifications, total, isAllRead, markAllRead, ...queryResult };
}
