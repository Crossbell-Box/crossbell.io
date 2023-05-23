import React from "react";
import { NotificationTypeKey } from "crossbell";
import { useAccountCharacter } from "@crossbell/react-account";
import {
	useCharacterNotification,
	useCharacterNotificationUnreadCount,
	useMarkCharacterNotificationAsRead,
} from "@crossbell/indexer";
import { useRefCallback } from "@crossbell/util-hooks";

const defaultTypes: NotificationTypeKey[] = [
	"OPERATOR_ADDED",
	"OPERATOR_REMOVED",
	"LINKED",
	"UNLINKED",
	"NOTE_MINTED",
	"NOTE_POSTED",
	"MENTIONED",
	"TIPPED",
];

export function useNotifications(options?: { types?: NotificationTypeKey[] }) {
	const characterId = useAccountCharacter()?.characterId;
	const { data, ...queryResult } = useCharacterNotification(
		characterId,
		options?.types ?? defaultTypes
	);
	const { mutate: markAsRead } =
		useMarkCharacterNotificationAsRead(characterId);

	const { data: unreadCount } =
		useCharacterNotificationUnreadCount(characterId);

	const notifications = React.useMemo(
		() => data?.pages.flatMap(({ list }) => list) ?? [],
		[data]
	);

	const total = data?.pages?.[0]?.count ?? 0;
	const isAllRead = unreadCount === 0;

	const markAllRead = useRefCallback(() => {
		if (!isAllRead) {
			markAsRead();
		}
	});

	return {
		notifications,
		total,
		isAllRead,
		unreadCount,
		markAllRead,
		...queryResult,
	};
}
