import React from "react";
import dayjs from "dayjs";
// https://github.com/iamkun/dayjs/issues/1167
import relativeTime from "dayjs/plugin/relativeTime.js";
import { Indicator, Avatar } from "@mantine/core";

import { ParsedNotification } from "@crossbell/indexer";
import {
	CrossbellChainLogo,
	useCharacterAvatar,
	useUrlComposer,
	UrlComposer,
} from "@crossbell/ui";
import { extractCharacterName } from "@crossbell/util-metadata";

import styles from "./item.module.css";

dayjs.extend(relativeTime);

export type ItemProps = {
	isRead: boolean;
	notification: ParsedNotification;
};

export function Item({ notification, isRead }: ItemProps) {
	const urlComposer = useUrlComposer();
	const character = notification.fromCharacter;
	const titleInfo = getTitleInfo(notification, urlComposer);
	const avatar = useCharacterAvatar(character);

	if (!notification) return null;

	return (
		<div className={styles.container}>
			<a
				href={urlComposer.characterUrl(character)}
				target="_blank"
				rel="noreferrer"
			>
				<Indicator size={9} disabled={isRead} color="red" offset={4.5}>
					<Avatar radius="xl" src={avatar.src} />
				</Indicator>
			</a>
			<div className={styles.main}>
				<div className={styles.description}>
					<a
						className={styles.characterName}
						href={urlComposer.characterUrl(character)}
						target="_blank"
						rel="noreferrer"
					>
						{extractCharacterName(character)}
					</a>

					<span className={styles.actionDesc}>
						{actionDesc(notification, urlComposer)}
					</span>

					<span>{timeDiff(notification)}</span>

					<span>
						on{" "}
						{renderTransactionHash(notification.transactionHash, urlComposer)}
					</span>
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

function renderTransactionHash(
	transactionHash: string,
	urlComposer: UrlComposer
) {
	return (
		<a
			href={urlComposer.scanTxUrl({ txHash: transactionHash })}
			target="_blank"
			rel="noreferrer"
			className={styles.transactionHash}
		>
			<CrossbellChainLogo />
			Crossbell Chain
		</a>
	);
}

function actionDesc(
	notification: ParsedNotification,
	urlComposer: UrlComposer
) {
	switch (notification.type) {
		case "comment":
			return (
				<span>
					{"commented your "}
					<a
						href={urlComposer.noteUrl(notification.originNote)}
						title={notification.originNote.metadata?.content?.content}
					>
						Note
					</a>
				</span>
			);
		case "like":
			return <span>liked your Note</span>;
		case "follow":
			return <span>followed you</span>;
	}

	return null;
}

function getTitleInfo(
	notification: ParsedNotification,
	urlComposer: UrlComposer
) {
	switch (notification.type) {
		case "comment":
			return {
				title:
					(notification.commentNote.metadata?.content?.title ??
						notification.commentNote.metadata?.content?.content) ||
					"Note",
				url: urlComposer.noteUrl(notification.commentNote),
			};
		case "like":
			return {
				title:
					(notification.originNote.metadata?.content?.title ??
						notification.originNote.metadata?.content?.content) ||
					"Note",
				url: urlComposer.noteUrl(notification.originNote),
			};
	}

	return null;
}

function timeDiff(notification: ParsedNotification) {
	return dayjs(notification.createdAt).fromNow();
}
