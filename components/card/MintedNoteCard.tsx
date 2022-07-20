import { Text } from "@mantine/core";
import type { MintedNoteEntity } from "crossbell.js";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";

interface Character {
	avatar: string;
	name: string;
	handle: string;
}

interface Treasure {
	id: string;
	text?: string;
	image: string;
	mintCount: number;
}

type TreasurePartProps = {
	treasure: Treasure;
};

type CharacterPartProps = {
	character: Character;
};

type MintedNoteRawProps = TreasurePartProps & CharacterPartProps;

type MintedNoteProps = {
	mintedNote: MintedNoteEntity;
};

const TreasurePart = ({ treasure, character }: MintedNoteRawProps) => (
	<div className="relative">
		<div
			className="bg-cover bg-center aspect-ratio-video rounded-t-lg text-white flex items-center p-2"
			style={{
				backgroundImage: `${
					treasure.text
						? `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), `
						: ""
				}url(${treasure.image})`,
			}}
		>
			{treasure.text && (
				<Text className="font-bold mt-6" lineClamp={3}>
					{treasure.text}
				</Text>
			)}
		</div>
		<div className="absolute top-0 w-full">
			<div className="absolute left-0 m-2">
				<div className="w-9 h-9 rounded-full">
					<img
						className="w-full h-full rounded-full object-cover"
						style={{
							border: "2px solid white",
						}}
						src={character.avatar}
						alt={character.name}
					/>
				</div>
			</div>
			<div
				className={`absolute right-0 m-2 flex flex-row justify-center gap-1 ${
					treasure.text
						? "bg-[#F3F7FB] text-[#142C3F]"
						: "bg-[#282C34] text-[#FFFFFF]"
				} px-2 py-1 min-w-12 text-center rounded-full text-sm font-bold`}
			>
				<span>
					#
					{treasure.id.length >= 8
						? `${treasure.id.slice(0, 2)}...${treasure.id.slice(-2)}`
						: treasure.id}
				</span>
			</div>
		</div>
	</div>
);

const CharacterPart = ({ treasure, character }: MintedNoteRawProps) => (
	<div className="flex flex-row justify-between bg-white p-2 rounded-b-lg">
		<div className="flex flex-col justify-around text-[#687792] text-left">
			<Text className="text-sm font-bold">{character.name}</Text>
			<Text className="text-xs">@{character.handle}</Text>
		</div>

		<div className="flex flex-col text-right">
			<Text className="text-xs font-semibold text-[#082135]">
				{treasure.mintCount}
			</Text>
			<Text className="text-xs font-light text-[#687792]">Mint</Text>
		</div>
	</div>
);

export const MintedNoteRawCard = ({
	character,
	treasure,
}: MintedNoteRawProps) => (
	<div className="w-full relative">
		<TreasurePart treasure={treasure} character={character} />
		<CharacterPart treasure={treasure} character={character} />
	</div>
);

const MintedNoteCard = ({ mintedNote }: MintedNoteProps) => (
	<MintedNoteRawCard
		character={{
			avatar: ipfsLinkToHttpLink(
				mintedNote.noteCharacter?.metadata?.content?.avatars?.[0] || ""
			),
			name: mintedNote.noteCharacter?.metadata?.content?.name || "",
			handle: mintedNote.noteCharacter?.handle || "",
		}}
		treasure={{
			id: mintedNote.tokenId.toString(),
			text:
				mintedNote.note?.metadata?.content?.title ||
				mintedNote.note?.metadata?.content?.content,
			image:
				mintedNote.note?.metadata?.content?.attachments?.find((attachment) =>
					attachment.mime_type?.startsWith("image/")
				)?.address || "", // TODO: Default fallback image
			mintCount: -1, // TODO: minted count?
		}}
	/>
);

export default MintedNoteCard;
