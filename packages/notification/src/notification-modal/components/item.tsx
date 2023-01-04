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
import config from "~/shared/config";

dayjs.extend(relativeTime);

export type ItemProps = {
	isRead: boolean;
	notification: ParsedNotification;
};

export function Item({ notification, isRead }: ItemProps) {
	if (!notification) return null;

	const character = notification.fromCharacter;
	const titleInfo = getTitleInfo(notification);

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
				<div className={styles.description}>
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
				{titleInfo && (
					<div className={styles.title}>
						<a href={titleInfo.url} target="_blank" rel="noreferrer">
							{titleInfo.title}
						</a>
					</div>
				)}
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
					{" your Note"}
				</span>
			);
		case "like":
			return <span>liked your Note</span>;
		case "follow":
			return <span>followed your Character</span>;
	}

	return null;
}

function getTitleInfo(notification: ParsedNotification) {
	switch (notification.type) {
		case "like":
		case "comment":
			return {
				title:
					(notification.originNote.metadata?.content?.title ??
						notification.originNote.metadata?.content?.content) ||
					"Note",
				url: `${config.domain}/notes/${composeNoteId(
					notification.originNote.characterId,
					notification.originNote.noteId
				)}`,
			};
		case "follow":
			return {
				title: extractCharacterName(notification.toCharacter),
				url: composeCharacterHref(notification.toCharacter.handle),
			};
	}

	return null;
}

function timeDiff(notification: ParsedNotification) {
	return dayjs(notification.createdAt).fromNow();
}
