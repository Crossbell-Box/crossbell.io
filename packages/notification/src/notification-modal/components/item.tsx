import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Indicator } from "@mantine/core";

import { ParsedNotification } from "@crossbell/indexer";
import { CrossbellChainLogo } from "@crossbell/ui";
import { extractCharacterName } from "@crossbell/util-metadata";

import { Avatar } from "~/shared/components/avatar";
import {
	composeCharacterHref,
	composeNoteId,
	composeScanTxHref,
} from "~/shared/url";

import styles from "./item.module.css";

dayjs.extend(relativeTime);

export type ItemProps = {
	isRead: boolean;
	notification: ParsedNotification;
};

export function Item({ notification, isRead }: ItemProps) {
	if (!notification) return null;

	const character = notification.fromCharacter;

	return (
		<div className={styles.container}>
			<a
				href={composeCharacterHref(character.handle)}
				target="_blank"
				rel="noreferrer"
			>
				<Indicator size={9} disabled={isRead} color="red" offset={4.5}>
					<Avatar character={character} />
				</Indicator>
			</a>
			<div className={styles.main}>
				<a
					className={styles.characterName}
					href={composeCharacterHref(character.handle)}
					target="_blank"
					rel="noreferrer"
				>
					{extractCharacterName(character)}
				</a>

				<span className={styles.actionDesc}>{actionDesc(notification)}</span>

				<span>{timeDiff(notification)}</span>

				<span>on {renderTransactionHash(notification.transactionHash)}</span>
			</div>
		</div>
	);
}

function renderTransactionHash(transactionHash: string) {
	return (
		<a
			href={composeScanTxHref(transactionHash)}
			target="_blank"
			rel="noreferrer"
			className={styles.transactionHash}
		>
			<CrossbellChainLogo />
			Crossbell Chain
		</a>
	);
}

function actionDesc(notification: ParsedNotification) {
	switch (notification.type) {
		case "comment":
			return (
				<span>
					<a
						href={`/notes/${composeNoteId(
							notification.commentNote?.characterId,
							notification.commentNote?.noteId
						)}`}
					>
						commented
					</a>
					{" your "}
					<a
						href={`/notes/${composeNoteId(
							notification.originNote.characterId,
							notification.originNote.noteId
						)}`}
						target="_blank"
						rel="noreferrer"
					>
						Note
					</a>
				</span>
			);
		case "like":
			return (
				<span>
					{"liked your "}
					<a
						href={`/notes/${composeNoteId(
							notification.originNote.characterId,
							notification.originNote.noteId
						)}`}
						target="_blank"
						rel="noreferrer"
					>
						Note
					</a>
				</span>
			);
		case "follow":
			return <span>follows you</span>;
	}

	return null;
}

function timeDiff(notification: ParsedNotification) {
	return dayjs(notification.createdAt).fromNow();
}
