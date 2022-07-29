import Avatar from "@/components/common/Avatar";
import { formatDate, formatDateFromNow } from "@/utils/time";
import { Skeleton, Space, Text } from "@mantine/core";
import { NoteEntity } from "crossbell.js";
import { useCharacter, useNoteStatus } from "@/utils/apis/indexer";
import classNames from "classnames";
import MediaCarousel from "./MediaCarousel";
import { useRouter } from "next/router";
import { composeCharacterHref, composeNoteHref } from "@/utils/url";
import { useLikeNote, useMintNote, useUnlikeNote } from "@/utils/apis/contract";
import { copyToClipboard } from "@/utils/other";
import { showNotification } from "@mantine/notifications";
import Tooltip from "../Tooltip";
import Link from "next/link";
import { extractCharacterName } from "@/utils/metadata";
import LoadingOverlay from "../LoadingOverlay";
import { NextLink } from "@mantine/next";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useAccount } from "wagmi";

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
				className="flex items-center group"
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
	note,
	collapsible,
}: {
	collapsible?: boolean;
	note: NoteEntity;
}) {
	const { data: character } = useCharacter(note.characterId);

	const { data: status } = useNoteStatus(note.characterId, note.noteId);

	const router = useRouter();
	const targetURL = composeNoteHref(note.characterId, note.noteId);
	const handleClickNote = () => {
		if (router.asPath === targetURL) return;

		router.push(targetURL);
	};

	const likeNote = useLikeNote(note.characterId, note.noteId);
	const unlikeNote = useUnlikeNote(note.characterId, note.noteId);

	const { address } = useAccount();
	const mintNote = useMintNote(note.characterId, note.noteId, address!);

	const authorName = extractCharacterName(character);

	return (
		<div
			className="flex flex-row w-full py-3 px-3 border-b border-gray/20 bg-hover cursor-pointer"
			onClick={handleClickNote}
		>
			<LoadingOverlay
				visible={
					likeNote.isLoading || unlikeNote.isLoading || mintNote.isLoading
				}
				description="Loading..."
				global
			/>

			{/* avatar */}
			<div>
				<Avatar address={note.owner} characterId={note.characterId} size={48} />
			</div>

			<Space w={10} />

			{/* right side */}
			<div className="flex-grow">
				{/* username */}
				<div className="flex items-baseline">
					<Link href={composeCharacterHref(character?.handle!)} passHref>
						<Text
							color="dark"
							weight="bolder"
							component="a"
							variant="link"
							onClick={(e: any) => e.stopPropagation()}
						>
							{authorName}
						</Text>
					</Link>

					<Space w={3} />

					<Text color="dimmed" size="sm">
						@{character?.handle}
					</Text>

					<Text color="dimmed" size="sm" className="mx-1">
						·
					</Text>

					<Tooltip label={formatDate(note.createdAt)}>
						<Text
							component={NextLink}
							href={targetURL}
							color="dimmed"
							size="sm"
							variant="link"
						>
							{formatDateFromNow(note.createdAt)}
						</Text>
					</Tooltip>
				</div>

				{/* content */}
				<div>
					<MarkdownRenderer collapsible={collapsible}>
						{note.metadata?.content?.content ?? ""}
					</MarkdownRenderer>
				</div>

				<Space h={10} />

				{note.metadata?.content?.attachments && (
					<MediaCarousel attachments={note.metadata?.content.attachments} />
				)}

				{/* media */}

				<Space h={10} />

				{/* actions */}
				<div className="flex items-center justify-between">
					{/* comment */}
					<ActionButton
						text={status?.commentCount}
						label="Comment"
						icon="i-csb:comment"
						bgHoverColor="group-hover:bg-blue/10"
						textHoverColor="group-hover:text-blue"
						onClick={() => {
							handleClickNote();
						}}
					/>

					{/* like */}
					<ActionButton
						text={status?.likeCount}
						label="Like"
						icon={status?.isLiked ? "i-csb:like-filled" : "i-csb:like"}
						color={status?.isLiked ? "text-red" : "text-dimmed"}
						bgHoverColor="group-hover:bg-red/10"
						textHoverColor="group-hover:text-red"
						onClick={() => {
							if (status?.isLiked) {
								unlikeNote.mutate();
							} else {
								likeNote.mutate();
							}
						}}
					/>

					{/* mint */}
					<ActionButton
						text={status?.mintCount}
						label="Mint"
						icon="i-csb:mint"
						color={status?.isMinted ? "text-yellow" : "text-dimmed"}
						bgHoverColor="group-hover:bg-yellow/10"
						textHoverColor="group-hover:text-yellow"
						onClick={() => {
							if (!status?.isMinted) {
								mintNote.mutate();
							}
						}}
					/>

					{/* share */}
					<ActionButton
						label="Share"
						icon="i-csb:share"
						bgHoverColor="group-hover:bg-green/10"
						textHoverColor="group-hover:text-green"
						onClick={async () => {
							await copyToClipboard(location.href);
							showNotification({
								message: "Copied to Clipboard!",
								disallowClose: true,
							});
						}}
					/>

					{/* used for ui placeholder */}
					<div className="flex items-center"></div>
				</div>
			</div>
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

					<Text color="dimmed" size="sm" className="mx-1">
						·
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
