import {
	useInfiniteQuery,
	useQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import type { NotificationTypeKey, Numberish } from "crossbell";
import compact from "lodash.compact";

import { indexer } from "../indexer";
import { parseNotificationEntity } from "./notification.parser";

export * from "./notification.types";

const SCOPE_KEY_CHARACTER_NOTIFICATION = (
	characterId: Numberish | undefined,
	types?: NotificationTypeKey[],
) => ["indexer", "character", "notification", characterId, types];

const SCOPE_KEY_CHARACTER_NOTIFICATION_UNREAD_COUNT = (
	characterId?: Numberish | undefined,
) => ["indexer", "character", "notification", "unread_count", characterId];

export function useCharacterNotification(
	characterId: Numberish | undefined,
	types: NotificationTypeKey[],
) {
	return useInfiniteQuery(
		SCOPE_KEY_CHARACTER_NOTIFICATION(characterId, types),
		async ({ pageParam }) => {
			const { list, ...rest } = await indexer.notification.getMany(
				characterId!,
				{
					type: types,
					limit: 20,
					cursor: pageParam,
					includeIsRead: true,
				},
			);

			return {
				...rest,
				list: compact(await Promise.all(list.map(parseNotificationEntity))),
			};
		},
		{
			enabled: Boolean(characterId),
			getNextPageParam: (lastPage) => lastPage.cursor,
		},
	);
}

export function useCharacterNotificationUnreadCount(
	characterId: Numberish | undefined,
) {
	return useQuery(
		SCOPE_KEY_CHARACTER_NOTIFICATION_UNREAD_COUNT(characterId),
		async () => {
			if (!characterId) return 0;

			const { count } = await indexer.notification.getUnreadCount(characterId);

			return count;
		},
	);
}

export function useMarkCharacterNotificationAsRead(
	characterId: Numberish | undefined,
) {
	const queryClient = useQueryClient();

	return useMutation(
		async () => {
			if (characterId) {
				await indexer.notification.markAllAsRead(characterId);
			}
		},
		{
			onSuccess() {
				return Promise.all([
					queryClient.invalidateQueries(
						SCOPE_KEY_CHARACTER_NOTIFICATION(characterId),
					),

					queryClient.invalidateQueries(
						SCOPE_KEY_CHARACTER_NOTIFICATION_UNREAD_COUNT(characterId),
					),
				]);
			},
		},
	);
}
