import Avatar from "@/components/common/Avatar";
import { Skeleton, Space, Text } from "@mantine/core";
import { CharacterEntity, NoteEntity } from "crossbell.js";
import { useCharacter, useNoteStatus } from "@/utils/apis/indexer";
import classNames from "classnames";
import MediaCarousel from "./MediaCarousel";
import { useRouter } from "next/router";
import { composeNoteHref, useNoteRouterQuery } from "@/utils/url";
import { useLikeNote, useMintNote, useUnlikeNote } from "@/utils/apis/contract";
import { copyToClipboard } from "@/utils/other";
import { showNotification } from "@mantine/notifications";
import Tooltip from "../Tooltip";
import LoadingOverlay from "../LoadingOverlay";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useAccount } from "wagmi";
import { CharacterName } from "../Character";
import Time from "../Time";
import { getValidAttachments } from "@/utils/metadata";

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
	const { data: character } = useCharacter(note.characterId, {
		initialData: initialCharacter,
	});

	const { navigate, href } = useNavigateToNote(note.characterId, note.noteId);

	const { characterId, noteId } = useNoteRouterQuery();

	// calculate displayMode smartly
	if (!displayMode) {
		const isMainNote =
			characterId === note.characterId && noteId === note.noteId;
		displayMode = isMainNote ? "main" : "normal";
	}

	const renderUsername = () => {
		if (displayMode === "normal") {
			return (
				<div className="flex flex-wrap items-baseline">
					{/* username */}
					<CharacterName character={character} characterId={characterId} />

					<Space w={3} />

					<Text color="dimmed" size="sm">
						@{character?.handle}
					</Text>

					<Text color="dimmed" size="sm" className="mx-1">
						·
					</Text>

					{/* time */}
					<Time href={href} date={note.createdAt} mode="fromNow" />
				</div>
			);
		}

		if (displayMode === "main") {
			return (
				<div>
					{/* username */}
					<CharacterName character={character} characterId={characterId} />

					<Text color="dimmed" size="sm" className="leading-1em">
						@{character?.handle}
					</Text>
				</div>
			);
		}
	};

	const renderBottomInfo = () => {
		if (displayMode === "normal") {
			return <></>;
		}

		if (displayMode === "main") {
			return (
				<div>
					<Space h={10} />
					<Time href={href} date={note.createdAt} mode="accurate" />
				</div>
			);
		}
	};

	const renderContent = () => {
		const clxs = displayMode === "main" ? "text-1.25em" : "text-1em";
		return (
			<div className={clxs}>
				<MarkdownRenderer collapsible={collapsible}>
					{note.metadata?.content?.content ?? ""}
				</MarkdownRenderer>
			</div>
		);
	};

	const validAttachments = getValidAttachments(
		note.metadata?.content?.attachments
	);

	return (
		<div
			className="flex flex-row w-full py-3 px-3 border-b border-gray/20 bg-hover cursor-pointer"
			onClick={() => navigate()}
		>
			{/* avatar */}
			<div>
				<Avatar characterId={note.characterId} character={character} />
			</div>

			<Space w={10} />

			{/* right side */}
			<div className="flex-grow">
				{renderUsername()}

				{/* content */}
				{renderContent()}

				<Space h={10} />

				{Boolean(validAttachments?.length) && (
					<MediaCarousel attachments={validAttachments} />
				)}

				{/* media */}

				{renderBottomInfo()}

				<Space h={10} />

				{/* actions */}
				<NoteActions characterId={note.characterId} noteId={note.noteId} />
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
	const { data: status } = useNoteStatus(characterId, noteId);

	const likeNote = useLikeNote(characterId, noteId);
	const unlikeNote = useUnlikeNote(characterId, noteId);

	const { address } = useAccount();
	const mintNote = useMintNote(characterId, noteId, address!);

	const { navigate } = useNavigateToNote(characterId, noteId);

	return (
		<div className="flex items-center justify-between">
			<LoadingOverlay
				visible={
					likeNote.isLoading || unlikeNote.isLoading || mintNote.isLoading
				}
				description="Loading..."
				global
			/>

			{/* comment */}
			<ActionButton
				text={status?.commentCount}
				label="Comment"
				icon="i-csb:comment"
				bgHoverColor="group-hover:bg-blue/10"
				textHoverColor="group-hover:text-blue"
				onClick={() => {
					navigate();
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
	const navigate = () => {
		if (router.asPath === targetURL) return;

		router.push(targetURL);
	};

	return { navigate, href: targetURL };
}
