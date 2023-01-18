import { useCharacter, useMintedNotesOfAddress } from "@crossbell/indexer";
import { ipfsLinkToHttpLink } from "~/shared/ipfs";
import {
	extractCharacterAvatar,
	extractCoverImageFromNote,
	extractPlainTextFromNote,
} from "@crossbell/util-metadata";
import { composeNoteHref, composeTreasuresWalletsHref } from "~/shared/url";
import { Space, Text } from "@mantine/core";
import Link from "next/link";
import { NoteEntity } from "crossbell.js";
import { Fragment } from "react";

export default function TreasuresGallery({ address }: { address?: string }) {
	const { data, isLoading } = useMintedNotesOfAddress(address, { limit: 8 });

	const hasResult = !isLoading && data?.pages.some((page) => page.count > 0);

	return (
		<div className="p-2 overflow-hidden">
			<div
				className="p-3 bg-white rounded-lg flex justify-between items-center overflow-hidden"
				style={{ boxShadow: "0px 0px 15px rgba(38, 108, 158, 0.1)" }}
			>
				{/* left - gallery */}
				<div className="w-full overflow-hidden">
					<Text className="font-deca font-600 text-xl">Treasures</Text>

					<Space h={5} />

					<div className="w-full overflow-hidden pt-10px">
						{/* TODO: i think here needs better ui */}
						<div className="flex">
							{data?.pages.map((page, index) => (
								<Fragment key={index}>
									{page.list.map((mintedNote) => (
										<NoteCover
											key={mintedNote.transactionHash}
											note={mintedNote.note}
										/>
									))}
								</Fragment>
							))}

							{!hasResult && (
								<div className="flex-1 flex justify-center items-center">
									<Text className="text-center">No treasures</Text>
								</div>
							)}
						</div>
					</div>
				</div>

				<Space w={10} />

				{/* right - more */}
				<div>
					{hasResult && (
						<Link
							href={composeTreasuresWalletsHref(address!)}
							className="flex items-center"
						>
							<Text color="dimmed" className="text-center">
								More
							</Text>
							<Text color="dimmed" className="i-csb:more-right-arrow" />
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

function NoteCover({ note }: { note?: NoteEntity | null }) {
	let cover = extractCoverImageFromNote(
		ipfsLinkToHttpLink,
		note?.metadata?.content
	);
	const { data: character } = useCharacter(note?.characterId, {
		enabled: !cover,
	});
	cover = cover ?? extractCharacterAvatar(character);
	const content = extractPlainTextFromNote(note?.metadata?.content)?.slice(
		0,
		50
	);

	return (
		<Link
			href={composeNoteHref(note?.characterId!, note?.noteId!)}
			className="aspect-ratio-square relative flex justify-center items-center ml--20px first:ml-0 w-100px h-100px overflow-hidden rounded-md hover:translate-y--10px transition-transform cursor-pointer"
			style={{
				background: cover
					? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${ipfsLinkToHttpLink(
							cover
					  )}) center center/cover no-repeat, gray`
					: "gray",
			}}
		>
			{/* {!cover && ( */}
			<div className="h-100px w-100px flex justify-center items-center p-2 overflow-hidden">
				<Text
					size="sm"
					className="leading-1em w-100px text-white"
					lineClamp={3}
				>
					{content}
				</Text>
			</div>
			{/* )} */}
		</Link>
	);
}
