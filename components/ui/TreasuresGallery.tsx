import { useMintedNotesOfAddress } from "@/utils/apis/indexer";
import { extractCoverImageFromNote } from "@/utils/metadata";
import { composeTreasuresWalletsHref } from "@/utils/url";
import { Space, Text } from "@mantine/core";
import { NoteEntity } from "crossbell.js";
import Link from "next/link";
import { Fragment } from "react";
import Image from "../common/Image";

export default function TreasuresGallery({ address }: { address?: string }) {
	const { data, isLoading } = useMintedNotesOfAddress(address, { limit: 10 });

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
						<Link href={composeTreasuresWalletsHref(address!)} passHref>
							<a className="flex items-center">
								<Text color="dimmed" className="text-center">
									More
								</Text>
								<Text color="dimmed" className="i-csb:more-right-arrow" />
							</a>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

function NoteCover({ note }: { note?: NoteEntity | null }) {
	const cover = extractCoverImageFromNote(note?.metadata?.content);
	const content = note?.metadata?.content?.content?.slice(0, 100);

	return (
		<div className="relative flex justify-center items-center ml--20px first:ml-0 w-100px h-100px overflow-hidden rounded-md hover:translate-y--10px transition-transform">
			<div className="absolute top-0 left-0 bottom-0 right-0 z-0">
				{cover && (
					<Image
						className="object-cover"
						src={cover}
						width={100}
						height={100}
					/>
				)}
			</div>

			{!cover && (
				<div className="bg-gray h-100px w-100px flex justify-center items-center p-2">
					<Text size="sm" className="leading-1em w-100px" lineClamp={3}>
						{content}
					</Text>
				</div>
			)}
		</div>
	);
}
