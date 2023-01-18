import { Text } from "@mantine/core";
import type { NoteEntity } from "crossbell.js";
import { ipfsLinkToHttpLink } from "~/shared/ipfs";
import Link from "next/link";
import { composeNoteHref, composeNoteId } from "~/shared/url";
import { useCharacter, useNoteMintedCount } from "@crossbell/indexer";
import {
	extractCharacterAvatar,
	extractCharacterName,
	extractCoverImageFromNote,
	extractPlainTextFromNote,
} from "@crossbell/util-metadata";
import { Avatar } from "~/shared/components/avatar";

const MintedNoteCard = ({ note }: { note: NoteEntity }) => {
	const noteId = composeNoteId(note.characterId, note.noteId);

	const noteText = extractPlainTextFromNote(note.metadata?.content);
	const noteImage = extractCoverImageFromNote(
		ipfsLinkToHttpLink,
		note.metadata?.content
	);

	// get character
	const { data: character } = useCharacter(note.characterId);
	const characterAvatar = extractCharacterAvatar(character);

	const bgImage = ipfsLinkToHttpLink(noteImage ?? characterAvatar ?? "");

	// get minted count
	const { data: mintedCount } = useNoteMintedCount(
		note.characterId,
		note.noteId
	);

	return (
		<Link href={composeNoteHref(note.characterId, note.noteId)}>
			<div className="w-full relative cursor-pointer transition ease-in-out hover:-translate-y-1">
				{/* treasure */}
				<div className="relative">
					<div
						className="bg-cover bg-center aspect-ratio-video rounded-t-lg text-white flex items-center p-2"
						style={{
							backgroundImage: `${
								noteText
									? `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), `
									: ""
							}url(${bgImage})`,
						}}
					>
						{noteText && (
							<Text className="font-bold mt-6" lineClamp={3}>
								{noteText}
							</Text>
						)}
					</div>
					<div className="absolute top-0 w-full">
						<div className="absolute left-0 m-2">
							<div className="w-9 h-9 rounded-full">
								{/* avatar */}
								<Avatar
									className="w-full h-full rounded-full object-cover"
									style={{ border: "2px solid white" }}
									character={character}
								/>
							</div>
						</div>
						<div
							className={`absolute right-0 m-2 flex flex-row justify-center gap-1 ${
								noteText
									? "bg-[#F3F7FB] text-[#142C3F]"
									: "bg-[#282C34] text-[#FFFFFF]"
							} px-2 py-1 min-w-12 text-center rounded-full text-sm font-bold`}
						>
							<span>
								#
								{noteId.length >= 8
									? `${noteId.slice(0, 2)}...${noteId.slice(-2)}`
									: noteId}
							</span>
						</div>
					</div>
				</div>

				{/* character */}
				<div className="flex flex-row justify-between bg-white p-2 rounded-b-lg">
					<div className="flex flex-col justify-around text-[#687792] text-left">
						<Text className="text-sm font-bold">
							{extractCharacterName(character)}
						</Text>
						<Text className="text-xs">@{character?.handle}</Text>
					</div>

					<div className="flex flex-col text-right">
						<Text className="text-xs font-semibold text-[#082135]">
							{mintedCount}
						</Text>
						<Text className="text-xs font-light text-[#687792]">Minted</Text>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default MintedNoteCard;
