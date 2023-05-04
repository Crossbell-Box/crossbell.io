import React from "react";
import dayjs from "dayjs";
import { formatUnits } from "viem";
// https://github.com/iamkun/dayjs/issues/1167
import relativeTime from "dayjs/plugin/relativeTime.js";
import type { NoteEntity } from "crossbell.js";
import { Indicator, CharacterAvatar } from "@crossbell/ui";
import { ParsedNotification } from "@crossbell/indexer";
import { CrossbellChainLogo, useUrlComposer, UrlComposer } from "@crossbell/ui";
import { extractCharacterName } from "@crossbell/util-metadata";

import styles from "./item.module.css";

dayjs.extend(relativeTime);

export type ItemProps = {
	isRead: boolean;
	notification: ParsedNotification;
};

export function Item({ notification, isRead }: ItemProps) {
	const urlComposer = useUrlComposer();
	const titleInfo = getTitleInfo(notification, urlComposer);

	return (
		<div className={styles.container}>
			<a
				href={getCharacterUrl(notification, urlComposer)}
				target="_blank"
				rel="noreferrer"
			>
				<Indicator disabled={isRead}>
					<CharacterAvatar character={notification.fromCharacter} size={38} />
				</Indicator>
			</a>
			<div className={styles.main}>
				<div className={styles.description}>
					<a
						className={styles.characterName}
						href={getCharacterUrl(notification, urlComposer)}
						target="_blank"
						rel="noreferrer"
					>
						{getCharacterName(notification)}
					</a>

					<span className={styles.actionDesc}>
						{actionDesc(notification, urlComposer)}
					</span>

					<span>{timeDiff(notification)}</span>

					<span>
						on
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
		case "comment-note":
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
		case "like-note":
			return <span>liked your Note</span>;
		case "mint-note":
			return <span>minted your Note</span>;
		case "follow-character":
			return <span>followed you</span>;
		case "tip-note":
			return (
				<span>
					{`tipped you ${formatUnits(notification.amount, 9)} `}
					<a href="https://mira.crossbell.io/" target="_blank">
						MIRA
					</a>
					{` on your Note`}
				</span>
			);
		case "tip-character":
			return (
				<span>
					{`tipped you ${formatUnits(notification.amount, 9)} `}
					<a href="https://mira.crossbell.io/" target="_blank">
						MIRA
					</a>
				</span>
			);
		case "mention":
			return <span>mentioned you</span>;
	}

	return null;
}

function getTitleInfo(
	notification: ParsedNotification,
	urlComposer: UrlComposer
) {
	switch (notification.type) {
		case "comment-note":
			return {
				title: getNoteTitle(notification.commentNote),
				url: urlComposer.noteUrl(notification.commentNote),
			};
		case "like-note":
		case "mint-note":
			return {
				title: getNoteTitle(notification.originNote),
				url: urlComposer.noteUrl(notification.originNote),
			};
		case "tip-note":
			return {
				title: getNoteTitle(notification.toNote),
				url: urlComposer.noteUrl(notification.toNote),
			};
		case "mention":
			return {
				title: getNoteTitle(notification.fromNote),
				url: urlComposer.noteUrl(notification.fromNote),
			};
	}

	return null;
}

function getNoteTitle(note: NoteEntity | undefined) {
	return (
		note?.metadata?.content?.title || note?.metadata?.content?.content || "Note"
	);
}

function getCharacterName(notification: ParsedNotification) {
	switch (notification.type) {
		case "mint-note":
			return notification.fromCharacter
				? extractCharacterName(notification.fromCharacter)
				: notification.fromAddress;
		default:
			return extractCharacterName(notification.fromCharacter);
	}
}

function getCharacterUrl(
	notification: ParsedNotification,
	urlComposer: UrlComposer
): string | undefined {
	switch (notification.type) {
		case "mint-note":
			return notification.fromCharacter
				? urlComposer.characterUrl(notification.fromCharacter)
				: undefined;
		default:
			return urlComposer.characterUrl(notification.fromCharacter);
	}
}

function timeDiff(notification: ParsedNotification) {
	return dayjs(notification.createdAt).fromNow();
}
