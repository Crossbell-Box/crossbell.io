import { Space, Text, Title } from "@mantine/core";
import { CharacterEntity, NoteEntity } from "crossbell.js";
import classNames from "classnames";

import { useCharacter, useNote } from "@crossbell/indexer";
import { getValidAttachments } from "@crossbell/util-metadata";
import { ipfsLinkToHttpLink } from "~/shared/ipfs";

import { Avatar } from "~/shared/components/avatar";
import { CharacterHandle, CharacterName } from "~/shared/components/character";

import Time from "../../Time";
import MetadataContentUpdater from "../../MetadataContentUpdater";

import { MarkdownRenderer } from "../components/markdown-renderer";
import MediaCarousel from "../components/media-carousel";
import NoteSourceBadges from "../components/note-source-badges";
import NoteIdBadge from "../components/note-id-badge";
import { NoteLikes } from "../components/note-likes";
import { NoteMints } from "../components/note-mints";
import { NoteActions } from "../components/note-actions";

import { useNavigateToNote } from "../hooks/use-navigate-to-note";
import { useNoteModel } from "@/components/common/Note/hooks/use-note-model";

export function MainNote({
	note: initialNote,
	character: initialCharacter,
	collapsible,
}: {
	collapsible?: boolean;
	note: NoteEntity;
	character?: CharacterEntity | null;
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

	const model = useNoteModel(note);

	const renderAvatar = () => {
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
	};

	const renderUsername = () => {
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
	};

	const renderReplyingInfo = () => {
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
	};

	const renderBottomInfo = () => {
		return (
			<div>
				<div className="flex flex-row justify-between items-center">
					{/* source */}
					<NoteSourceBadges noteMetadata={note.metadata?.content} />

					{/* id */}
					<NoteIdBadge note={note!} />
				</div>

				<Space h={10} />

				{/* time */}
				<Time href={href} date={note.createdAt!} mode="accurate" />
			</div>
		);
	};

	const renderContent = () => {
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

		return (
			<div>
				{note.metadata?.content?.title && (
					<Title order={2} className="my-2">
						{note.metadata.content.title}
					</Title>
				)}

				<MarkdownRenderer collapsible={collapsible} displayMode="main">
					{note.metadata?.content?.content ?? ""}
				</MarkdownRenderer>
			</div>
		);
	};

	const validAttachments = getValidAttachments(
		note.metadata?.content?.attachments,
		{ ipfsLinkToHttpLink }
	);

	return (
		<div
			className={classNames(
				"flex w-full py-3 px-3 border-b border-gray/20 flex-col"
			)}
			onClick={navigate}
			onMouseEnter={prefetch}
		>
			{/* avatar & username */}
			<div className="flex">
				{/* avatar */}
				{renderAvatar()}
				<Space w={10} />
				{renderUsername()}
			</div>

			<Space w={10} />

			{/* right side */}
			<div className="flex-grow overflow-hidden">
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

				<div className="flex items-center gap-[16px] mb-10px">
					<NoteLikes model={model} />
					<NoteMints model={model} />
				</div>

				{/* actions */}
				<NoteActions model={model} />
			</div>
		</div>
	);
}
