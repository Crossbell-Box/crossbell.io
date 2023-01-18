import { useTrending } from "~/shared/apis/trending";
import {
	extractPlainTextFromNote,
	getValidAttachments,
} from "@crossbell/util-metadata";
import { composeNoteHref } from "~/shared/url";
import { Group, Skeleton, Space, Text } from "@mantine/core";
import { NoteEntity } from "crossbell.js";
import { useRouter } from "next/router";
import { Avatar } from "~/shared/components/avatar";
import { CharacterName } from "~/shared/components/character";
import { Image } from "~/shared/components/image";
import Time from "../common/Time";
import BaseSection from "./BaseSection";
import { ipfsLinkToHttpLink } from "~/shared/ipfs";

export default function TrendingNotesSection() {
	const { data, isLoading } = useTrending("note");

	const items =
		data?.pages?.flatMap(
			({ items }) =>
				items?.map((note) => (
					<NoteListItem
						note={note}
						key={`${note.characterId}-${note.noteId}`}
					/>
				)) ?? []
		) ?? [];

	if (isLoading) {
		return (
			<BaseSection title="Trending Notes">
				{Array(5)
					.fill(0)
					.map((_, i) => (
						<NoteListItemSkeleton key={i} />
					))}
			</BaseSection>
		);
	}

	if (items.length > 0) {
		return (
			<BaseSection title="Trending Notes">{items.slice(0, 5)}</BaseSection>
		);
	}

	return null;
}

function NoteListItem({ note }: { note: NoteEntity }) {
	const image = getValidAttachments(note.metadata?.content?.attachments, {
		ipfsLinkToHttpLink,
		allowedMediaTypes: ["image"],
		allowedContentTypes: ["address"],
	})[0]?.address;

	const content = extractPlainTextFromNote(note.metadata?.content);

	const router = useRouter();

	const handlePushNote = () =>
		router.push(composeNoteHref(note.characterId, note.noteId));

	return (
		<div className="px-4 py-2 bg-hover cursor-pointer" onClick={handlePushNote}>
			<Group spacing="xs">
				{/* avatar */}
				<Avatar characterId={note.characterId} size={32} showHoverCard />

				{/* name */}
				<CharacterName characterId={note.characterId} showHoverCard />

				{/* time */}
				<Time date={note.createdAt} mode="fromNow" />
			</Group>

			<Space h={5} />

			<div className="flex flex-row">
				<Text size={13} lineClamp={3} className="leading-1.25em flex-1">
					{content}
				</Text>

				{image && (
					<div className="h-50px w-50px ml-2 rounded-md overflow-hidden">
						<Image
							src={image}
							className="object-cover"
							height={50}
							width={50}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

function NoteListItemSkeleton() {
	return (
		<div className="px-4 py-2 bg-hover cursor-pointer">
			<Group spacing="xs">
				<Skeleton height={32} circle />
				<Skeleton height="1em" width="3em" />
			</Group>

			<Space h={5} />

			<div>
				<Skeleton height="1em" />
				<Space h={5} />
				<Skeleton height="1em" />
			</div>
		</div>
	);
}
