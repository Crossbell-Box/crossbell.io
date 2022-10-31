import { useTrending } from "@/utils/apis/trending";
import {
	extractPlainTextFromNote,
	getValidAttachments,
} from "@/utils/metadata";
import { composeNoteHref } from "@/utils/url";
import { Group, Skeleton, Space, Text } from "@mantine/core";
import { NoteEntity } from "crossbell.js";
import Link from "next/link";
import { useRouter } from "next/router";
import Avatar from "../common/Avatar";
import { CharacterName } from "../common/Character";
import Image from "../common/Image";
import Time from "../common/Time";
import BaseSection from "./BaseSection";

export default function TrendingNotesSection() {
	const { data, isLoading } = useTrending(["note"]);

	const notes = data?.note?.slice(0, 5);

	return (
		<BaseSection title="Trending Notes">
			{isLoading
				? Array(5)
						.fill(0)
						.map((_, i) => <NoteListItemSkeleton key={i} />)
				: notes?.map((note, i) => (
						<NoteListItem
							note={note}
							key={`${note.characterId}-${note.noteId}`}
						/>
				  ))}
		</BaseSection>
	);
}

function NoteListItem({ note }: { note: NoteEntity }) {
	const image = getValidAttachments(note.metadata?.content?.attachments, {
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
