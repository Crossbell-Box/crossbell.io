import { NotificationEntity } from "crossbell.js";
import dayjs from "dayjs";

import { indexer } from "../indexer";
import { ParsedNotification } from "./notification.types";

export async function parseNotificationEntity(
	entity: NotificationEntity
): Promise<ParsedNotification | null> {
	const baseInfo = {
		transactionHash: entity.transactionHash,
		createdAt: dayjs(entity.createdAt).valueOf(),
		isReadBefore: !!entity.isRead,
	};

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
					...baseInfo,
					type: "follow-character",
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
					...baseInfo,
					type: "like-note",
					fromCharacter: link.fromCharacter,
					originNote: link.toNote,
				};
			}

			return null;
		}
		case "NOTE_POSTED": {
			const feed = entity.feed;

			if (
				feed?.note?.linkItemType === "Note" &&
				feed.note.toNote &&
				feed.character
			) {
				return {
					...baseInfo,
					type: "comment-note",
					fromCharacter: feed.character,
					originNote: feed.note.toNote,
					commentNote: feed.note,
				};
			}

			return null;
		}
		case "NOTE_MINTED": {
			const feed = entity.feed;

			if (feed?.contractAddress && feed.mintedNote?.note) {
				const fromAddress = feed.mintedNote.owner;
				const fromCharacter = await indexer.getPrimaryCharacter(fromAddress);

				return {
					...baseInfo,
					type: "mint-note",
					originNote: feed.mintedNote.note,
					fromAddress,
					fromCharacter,
				};
			}

			return null;
		}
	}
	return null;
}
