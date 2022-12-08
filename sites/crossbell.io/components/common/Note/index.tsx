import { Skeleton, Space, Text, Title } from "@mantine/core";
import { CharacterEntity, NoteEntity } from "crossbell.js";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useCallback } from "react";
import classNames from "classnames";

import Avatar from "@/components/common/Avatar";
import {
	useAccountCharacter,
	useToggleLikeNote,
	useMintNote,
} from "@crossbell/connect-kit";
import { useCharacter, useNote, useNoteStatus } from "@crossbell/indexer";
import { composeNoteHref, getOrigin, useNoteRouterQuery } from "~/url";
import { copyToClipboard } from "@/utils/other";
import { getValidAttachments } from "@crossbell/util-metadata";
import { useLoginChecker } from "@/utils/wallet/hooks";
import { useRefCallback } from "@crossbell/util-hooks";

import { CharacterHandle, CharacterName } from "../Character";
import LoadingOverlay from "../LoadingOverlay";
import Tooltip from "../Tooltip";
import Time from "../Time";
import MetadataContentUpdater from "../MetadataContentUpdater";

import { MarkdownRenderer } from "./MarkdownRenderer";
import MediaCarousel from "./MediaCarousel";
import NoteSourceBadges from "./NoteSourceBadges";
import NoteIdBadge from "./NoteIdBadge";

function ActionButton({
	text,
	label,
	color = "text-dimmed",
	icon = "i-csb:comment",
	bgHoverColor = "group-hover:bg-blue/10",
	textHoverColor = "group-hover:text-blue",
	onClick,
}: {
	text?: number | string | undefined;
	label: string;
	color?: string;
	icon: string;
	bgHoverColor: string;
	textHoverColor: string;
	onClick?: () => void;
}) {
	return (
		<Tooltip label={label}>
			<div
				className="flex items-center group cursor-pointer"
				onClick={(e) => {
					e.stopPropagation();
					onClick?.();
				}}
			>
				<div className="relative">
					<div
						className={classNames(
							"absolute rounded-100% top-0 bottom-0 left-0 right-0 scale-150",
							bgHoverColor
						)}
					/>
					<Text
						className={classNames("transition", color, icon, textHoverColor)}
					/>
				</div>
				<Space w={5} />
				<Text size="sm" className={classNames("text-dimmed", textHoverColor)}>
					{text}
				</Text>
			</div>
		</Tooltip>
	);
}

export function Note({
	note: initialNote,
	character: initialCharacter,
	collapsible,
	displayMode,
}: {
	collapsible?: boolean;
	note: NoteEntity;
	character?: CharacterEntity | null;
	/**
	 * - `normal`: normal view
	 * - `main`: emphasizing the main note in a single page
	 * This is smartly calculated from url unless specified.
	 */
	displayMode?: "normal" | "main";
}) {
	const { data: fetchedNote, refetch } = useNote(
		initialNote.characterId,
		initialNote.noteId,
		{
			initialData: initialNote,
		}
	);

	const note = fetchedNote!;

	const { data: character } = useCharacter(note.characterId, {
		initialData: initialCharacter,
	});

	const { navigate, href, prefetch } = useNavigateToNote(
		note.characterId!,
		note.noteId!
	);

	// calculate displayMode smartly
	const { characterId, noteId } = useNoteRouterQuery();
	if (!displayMode) {
		const isMainNote =
			characterId === note.characterId && noteId === note.noteId;
		displayMode = isMainNote ? "main" : "normal";
	}

	const renderAvatar = useCallback(() => {
		if (displayMode === "normal") {
			return (
				<div>
					<Avatar
						size={48}
						characterId={note.characterId}
						character={character}
						showHoverCard
					/>
				</div>
			);
		}

		if (displayMode === "main") {
			return (
				<div>
					<Avatar
						size={54}
						characterId={note.characterId}
						character={character}
						showHoverCard
					/>
				</div>
			);
		}
	}, [character, displayMode, note]);

	const renderUsername = useCallback(() => {
		if (displayMode === "normal") {
			return (
				<div className="flex flex-wrap items-baseline">
					{/* username */}
					<CharacterName
						character={character}
						characterId={note.characterId!}
						showHoverCard
					/>

					<Space w={3} />

					<CharacterHandle
						character={character}
						characterId={note.characterId!}
						showHoverCard
						color="dimmed"
						size="sm"
					/>

					<Text color="dimmed" size="sm" className="mx-1">
						·
					</Text>

					{/* time */}
					<Time href={href} date={note.createdAt!} mode="fromNow" />
				</div>
			);
		}

		if (displayMode === "main") {
			return (
				<div>
					<div>
						{/* username */}
						<CharacterName
							size="lg"
							character={character}
							characterId={note.characterId!}
							showHoverCard
						/>
					</div>

					<div>
						<CharacterHandle
							character={character}
							characterId={note.characterId!}
							showHoverCard
							color="dimmed"
							size="md"
							className="leading-1em"
						/>
					</div>
				</div>
			);
		}
	}, [character, displayMode, note]);

	const renderReplyingInfo = useCallback(() => {
		return (
			note.toNote && (
				<div>
					<Space h={10} />
					<Text size="sm" color="dimmed">
						Replying to{" "}
						<CharacterHandle
							character={note.toCharacter}
							characterId={note.toCharacterId!}
						/>
					</Text>
				</div>
			)
		);
	}, [note]);

	const renderBottomInfo = useCallback(() => {
		const Info = () => (
			<div className="flex flex-row justify-between items-center">
				{/* source */}
				<NoteSourceBadges noteMetadata={note.metadata?.content} />

				{/* id */}
				<NoteIdBadge note={note!} />
			</div>
		);
		if (displayMode === "normal") {
			return (
				<div>
					<Info />
				</div>
			);
		}

		if (displayMode === "main") {
			return (
				<div>
					<Info />

					<Space h={10} />

					{/* time */}
					<Time href={href} date={note.createdAt!} mode="accurate" />
				</div>
			);
		}
	}, [displayMode, note]);

	const renderContent = useCallback(() => {
		if (!note.metadata?.content) {
			return (
				<div>
					<Space h={10} />
					<MetadataContentUpdater
						uri={note.metadata?.uri}
						characterId={note.characterId}
						noteId={note.noteId}
						onUpdated={() => {
							refetch();
						}}
					/>
					<Space h={10} />
				</div>
			);
		}

		const titleOrder = displayMode === "main" ? 2 : 3;
		return (
			<div>
				{note.metadata?.content?.title && (
					<Title order={titleOrder} className="my-2">
						{note.metadata.content.title}
					</Title>
				)}

				<MarkdownRenderer collapsible={collapsible} displayMode={displayMode}>
					{note.metadata?.content?.content ?? ""}
				</MarkdownRenderer>
			</div>
		);
	}, [collapsible, displayMode, note]);

	const validAttachments = getValidAttachments(
		note.metadata?.content?.attachments
	);

	const handlePrefetchNotePage = useCallback(() => {
		prefetch();
	}, []);

	return (
		<div
			className={classNames("flex w-full py-3 px-3 border-b border-gray/20", {
				"bg-hover cursor-pointer flex-row": displayMode === "normal",
				"flex-col": displayMode === "main",
			})}
			onClick={navigate}
			onMouseEnter={handlePrefetchNotePage}
		>
			{/* avatar & username */}
			<div className="flex">
				{/* avatar */}
				{renderAvatar()}

				{displayMode === "main" && (
					<>
						<Space w={10} />
						{renderUsername()}
					</>
				)}
			</div>

			<Space w={10} />

			{/* right side */}
			<div className="flex-grow overflow-hidden">
				{displayMode === "normal" && renderUsername()}

				{/* replying info */}
				{renderReplyingInfo()}

				{/* content */}
				{renderContent()}

				{Boolean(validAttachments?.length) && (
					<div>
						<Space h={10} />
						<MediaCarousel attachments={validAttachments} />
						<Space h={10} />
					</div>
				)}

				{/* media */}

				{renderBottomInfo()}

				<Space h={10} />

				{/* actions */}
				<NoteActions characterId={note.characterId!} noteId={note.noteId!} />
			</div>
		</div>
	);
}

function NoteActions({
	characterId,
	noteId,
}: {
	characterId: number;
	noteId: number;
}) {
	const currentCharacter = useAccountCharacter();
	const { data: status } = useNoteStatus(
		characterId,
		noteId,
		currentCharacter ?? null
	);

	const {
		isLiked,
		isLoading: isToggleLikeNoteLoading,
		likeCount,
		toggleLike,
	} = useToggleLikeNote({
		characterId,
		noteId,
		status,
	});

	const { address } = useAccount();
	const mintNote = useMintNote(characterId, noteId, address!);

	const { navigate } = useNavigateToNote(characterId, noteId);
	const { validate } = useLoginChecker();

	const handleLike = useRefCallback(() => {
		if (validate()) {
			toggleLike();
		}
	});

	const handleMint = useRefCallback(() => {
		if (!status?.isMinted && validate({ walletRequired: true })) {
			mintNote.mutate();
		}
	});

	const handleCopyToClipboard = useCallback(async () => {
		await copyToClipboard(getOrigin() + composeNoteHref(characterId, noteId), {
			showNotification: true,
		});
	}, [characterId, noteId]);

	return (
		<div className="flex items-center justify-between">
			<LoadingOverlay
				visible={isToggleLikeNoteLoading || mintNote.isLoading}
				description="Loading..."
				global
			/>

			{/* comment */}
			<ActionButton
				text={status?.commentCount ?? "..."}
				label="Comment"
				icon="i-csb:comment"
				bgHoverColor="group-hover:bg-blue/10"
				textHoverColor="group-hover:text-blue"
				onClick={navigate}
			/>

			{/* like */}
			<ActionButton
				text={likeCount ?? "..."}
				label="Like"
				icon={isLiked ? "i-csb:like-filled" : "i-csb:like"}
				color={isLiked ? "text-red" : "text-dimmed"}
				bgHoverColor="group-hover:bg-red/10"
				textHoverColor="group-hover:text-red"
				onClick={handleLike}
			/>

			{/* mint */}
			<ActionButton
				text={status?.mintCount ?? "..."}
				label="Mint"
				icon="i-csb:mint"
				color={status?.isMinted ? "text-yellow" : "text-dimmed"}
				bgHoverColor="group-hover:bg-yellow/10"
				textHoverColor="group-hover:text-yellow"
				onClick={handleMint}
			/>

			{/* share */}
			<ActionButton
				label="Share"
				icon="i-csb:share"
				bgHoverColor="group-hover:bg-green/10"
				textHoverColor="group-hover:text-green"
				onClick={handleCopyToClipboard}
			/>

			{/* used for ui placeholder */}
			<div className="flex items-center"></div>
		</div>
	);
}

export function NoteSkeleton() {
	return (
		<div className="flex flex-row w-full py-3 px-3 border-b border-gray/20 bg-hover cursor-pointer">
			{/* avatar */}
			<div>
				<Skeleton height={48} circle />
			</div>

			<Space w={10} />

			{/* right side */}
			<div className="flex-grow">
				{/* username */}
				<div className="flex items-baseline">
					<Text weight="bolder">
						<Skeleton height="1em" radius="xl" />
					</Text>

					<Space w={3} />

					<Text color="dimmed" size="sm">
						<Skeleton height="1em" radius="xl" width={50} />
					</Text>

					<Text color="dimmed" size="sm">
						<Skeleton height="1em" radius="xl" width={50} />
					</Text>
				</div>

				{/* content */}
				<div>
					<Skeleton height="1em" radius="xl" my={5} />
					<Skeleton height="1em" radius="xl" my={5} />
					<Skeleton height="1em" radius="xl" my={5} />
				</div>

				<Space h={10} />

				{/* actions */}
				<div className="flex items-center justify-between">
					{/* comment */}

					{/* used for ui placeholder */}
					<div className="flex items-center"></div>
				</div>
			</div>
		</div>
	);
}

// hooks

function useNavigateToNote(characterId: number, noteId: number) {
	const router = useRouter();
	const targetURL = composeNoteHref(characterId, noteId);

	const navigate = useCallback(() => {
		if (router.asPath === targetURL) return;

		router.push(targetURL);
	}, [router.asPath, targetURL]);

	const prefetch = () => {
		if (router.asPath === targetURL) return;

		router.prefetch(targetURL);
	};

	return { navigate, href: targetURL, prefetch };
}
