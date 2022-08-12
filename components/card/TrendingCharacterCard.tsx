import { Button, Text } from "@mantine/core";
import type { Character } from "crossbell.js";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import { useCharacterFollowRelation, useCurrentCharacter } from "@/utils/apis/indexer";
import { useFollowCharacter } from "@/utils/apis/contract";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

type TrendingCharacter = {
	crossbell_id: number;
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

const FollowButton = ({ characterId }: {
	characterId: number,
}) => {
	const { data: currentCharacter } = useCurrentCharacter();

	const isSelf = currentCharacter?.characterId === characterId;

	const { data: followRelation, isLoadingFollowRelation } =
		useCharacterFollowRelation(
			currentCharacter?.characterId,
			characterId,
		);

	const follow = useFollowCharacter(characterId);

	const handleFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.stopPropagation();
		follow.mutate();
	};

	return isSelf ? (
		<Button className="w-full">
			<Text className="text-[#082135]">Bingo!</Text>
		</Button>
	) :isLoadingFollowRelation ? (
		<Button className="w-full" loading />
	) : followRelation?.isFollowing ? (
		<Button className="w-full" disabled>
			<Text className="text-[#082135]">Following</Text>
		</Button>
	) : (
		<Button className="w-full" onClick={handleFollow} loading={follow.isLoading}>
			<Text className="text-[#082135]">Follow</Text>
		</Button>
	)
}

export const TrendingCharacterRawCard = ({
	character,
}: TrendingCharacterRawProps) => {

	const router = useRouter();

	return (
		<div
			className="flex flex-col rounded-lg text-white p-4 w-full h-full justify-between bg-cover bg-center cursor-pointer transition ease-in-out hover:-translate-y-1"
			style={{
				backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${ipfsLinkToHttpLink(character.banner || character.avatar)})`,
				aspectRatio: "203/264",
			}}
			onClick={() => {
				router.push(`/@${character.handle}`)
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
					<FollowButton characterId={character.crossbell_id}/>
				</div>
			</div>
		</div>
	)
};

const TrendingCharacterCard = ({ character }: TrendingCharacterProps) => (
	<TrendingCharacterRawCard
		character={{
			crossbell_id: character.characterId,
			avatar: character.metadata?.avatars?.[0] || "",
			name: character.metadata?.name || "",
			bio: character.metadata?.bio || "",
			banner: "", // Not defined here?!
			handle: character.handle || "",
		}}
	/>
);

export default TrendingCharacterCard;
