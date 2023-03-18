import { Space, Text, Title } from "@mantine/core";
import { CharacterEntity, NoteEntity } from "crossbell.js";

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
import { NoteActions } from "../components/note-actions";

import { useNavigateToNote } from "../hooks/use-navigate-to-note";
import { useNoteModel } from "../hooks/use-note-model";

export function FeedNote({
	note: initialNote,
	character: initialCharacter,
	collapsible,
	isRepliedNote,
}: {
	collapsible?: boolean;
	note: NoteEntity;
	character?: CharacterEntity | null;
	isRepliedNote?: boolean;
}) {
	const { data: fetchedNote, refetch } = useNote(
		initialNote.characterId,
		initialNote.noteId
	);

	const note = fetchedNote ?? initialNote;

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
					size={48}
					characterId={note.characterId}
					character={character}
					showHoverCard
				/>
			</div>
		);
	};

	const renderUsername = () => {
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
					<Title order={3} className="my-2">
						{note.metadata.content.title}
					</Title>
				)}

				<MarkdownRenderer collapsible={collapsible} displayMode="normal">
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
			className={
				"flex w-full py-3 px-3 border-b border-gray/20 bg-hover cursor-pointer flex-row"
			}
			onClick={navigate}
			onMouseEnter={prefetch}
		>
			{/* avatar & username */}
			<div className="flex relative">
				{/* avatar */}
				{renderAvatar()}

				{isRepliedNote && (
					<div className="absolute w-2px left-1/2 top-[52px] bottom-[-20px] transform -translate-x-1/2 bg-[#D2DFF5]" />
				)}
			</div>

			<Space w={10} />

			{/* right side */}
			<div className="flex-grow overflow-hidden">
				{renderUsername()}

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
				<NoteActions model={model} />
			</div>
		</div>
	);
}
