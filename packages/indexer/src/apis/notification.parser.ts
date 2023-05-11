import { NotificationEntity } from "crossbell";
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
				const fromCharacter = await indexer.character.getPrimary(fromAddress);

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

		case "TIPPED": {
			const feed = entity.feed;

			if (!feed?.tip || feed?.type !== "TIP_CHARACTER") return null;

			const amount = BigInt(feed.tip.amount);

			if (feed?.tip && feed.character && feed.tip.toNote) {
				return {
					...baseInfo,
					amount,
					type: "tip-note",
					fromCharacter: feed.character,
					toNote: feed.tip.toNote,
				};
			}

			if (feed?.tip && feed.character && feed.tip.toCharacter) {
				return {
					...baseInfo,
					amount,
					type: "tip-character",
					fromCharacter: feed.character,
					toCharacter: feed.tip.toCharacter,
				};
			}

			return null;
		}

		case "MENTIONED": {
			const feed = entity.feed;

			if (feed?.character && feed.note) {
				return {
					...baseInfo,
					type: "mention",
					fromCharacter: feed.character,
					fromNote: feed.note,
				};
			}

			return null;
		}
	}
	return null;
}
