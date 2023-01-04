import { NotificationEntity } from "crossbell.js";
import dayjs from "dayjs";

import { ParsedNotification } from "./notification.types";

export async function parseNotificationEntity(
	entity: NotificationEntity
): Promise<ParsedNotification | null> {
	switch (entity.type) {
		case "LINKED": {
			const link = entity.feed?.link;

			if (
				link?.linkType === "follow" &&
				link?.linkItemType === "Character" &&
				link.fromCharacter &&
				link.toCharacter
			) {
				return {
					transactionHash: entity.transactionHash,
					type: "follow",
					createdAt: dayjs(entity.createdAt).valueOf(),
					fromCharacter: link.fromCharacter,
					toCharacter: link.toCharacter,
				};
			}

			if (
				link?.linkType === "like" &&
				link.linkItemType === "Note" &&
				link.fromCharacter &&
				link.toNote
			) {
				return {
					transactionHash: entity.transactionHash,
					type: "like",
					createdAt: dayjs(entity.createdAt).valueOf(),
					fromCharacter: link.fromCharacter,
					originNote: link.toNote,
				};
			}

			return null;
		}
		case "NOTE_POSTED":
			const feed = entity.feed;

			if (
				feed?.note?.linkItemType === "Note" &&
				feed.note.toNote &&
				feed.character
			) {
				return {
					type: "comment",
					transactionHash: entity.transactionHash,
					createdAt: dayjs(entity.createdAt).valueOf(),
					fromCharacter: feed.character,
					originNote: feed.note.toNote,
					commentNote: feed.note,
				};
			}

			return null;
	}
	return null;
}
