import { Button, Text } from "@mantine/core";
import type { Character } from "crossbell.js";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";

type TrendingCharacter = {
	avatar: string;
	name: string;
	bio: string;
	banner: string;
	handle: string;
};

type TrendingCharacterRawProps = {
	character: TrendingCharacter;
};

type TrendingCharacterProps = {
	character: Character;
};

export const TrendingCharacterRawCard = ({
	character,
}: TrendingCharacterRawProps) => (
	<div
		className="flex flex-col rounded-lg text-white p-4 w-full h-full justify-between bg-cover bg-center"
		style={{
			backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${ipfsLinkToHttpLink(character.banner || character.avatar)})`,
			aspectRatio: "203/264",
		}}
	>
		{/* bio */}
		<div className="text-left text-sm">
			<Text lineClamp={3}>{character.bio}</Text>
		</div>

		<div className="flex flex-col">
			<div className="flex flex-col gap-5">
				{/* avatar */}
				<div className="flex w-12 h-12 rounded-full border border-white border-2 self-center">
					<img
						className="w-full h-full rounded-full object-fit"
						src={ipfsLinkToHttpLink(character.avatar)}
						alt={character.handle}
					/>
				</div>

				{/* name */}
				<div className="flex flex-col gap-1">
					<Text className="font-bold text-sm">{character.name}</Text>
					<Text className="font-bold text-xs">@{character.handle}</Text>
				</div>
			</div>

			{/* actions */}
			<div className="mt-2">
				<Button className="w-full">
					<Text className="text-[#082135]">Follow</Text>
				</Button>
			</div>
		</div>
	</div>
);

const TrendingCharacterCard = ({ character }: TrendingCharacterProps) => (
	<TrendingCharacterRawCard
		character={{
			avatar: character.metadata?.avatars?.[0] || "",
			name: character.metadata?.name || "",
			bio: character.metadata?.bio || "",
			banner: "", // Not defined here?!
			handle: character.handle || "",
		}}
	/>
);

export default TrendingCharacterCard;
