import { useInfiniteQuery } from "@tanstack/react-query";
import { NotificationTypeKey } from "crossbell.js";
import compact from "lodash.compact";

import { indexer } from "../indexer";
import { parseNotificationEntity } from "./notification.parser";

export * from "./notification.types";

const SCOPE_KEY_CHARACTER_NOTIFICATION = (characterId: number | undefined) => [
	"indexer",
	"character",
	"notification",
	characterId,
];

export function useCharacterNotification(
	characterId: number | undefined,
	types: NotificationTypeKey[]
) {
	return useInfiniteQuery(
		SCOPE_KEY_CHARACTER_NOTIFICATION(characterId),
		async ({ pageParam }) => {
			const { list, ...rest } = await indexer.notification.getMany(
				characterId!,
				{
					type: types,
					limit: 20,
					cursor: pageParam,
					includeIsRead: true,
				}
			);

			return {
				...rest,
				list: compact(await Promise.all(list.map(parseNotificationEntity))),
			};
		},
		{
			enabled: Boolean(characterId),
			getNextPageParam: (lastPage) => lastPage.cursor,
		}
	);
}
