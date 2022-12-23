import React from "react";
import { NotificationTypeKey } from "crossbell.js";
import { useAccountCharacter } from "@crossbell/connect-kit";
import { useCharacterNotification } from "@crossbell/indexer";
import { useReadingState } from "./use-reading-state";

const types: NotificationTypeKey[] = [
	"OPERATOR_ADDED",
	"OPERATOR_REMOVED",
	"LINKED",
	"UNLINKED",
	"NOTE_MINTED",
	"NOTE_POSTED",
	"MENTIONED",
];

export function useNotifications() {
	const { isRead } = useReadingState();
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
		[notifications]
	);

	return { notifications, total, isAllRead, ...queryResult };
}
