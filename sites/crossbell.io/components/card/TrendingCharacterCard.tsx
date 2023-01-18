import { Button, Space, Text } from "@mantine/core";
import type { CharacterEntity } from "crossbell.js";
import { MouseEventHandler } from "react";
import Link from "next/link";

import {
	useAccountCharacter,
	useFollowCharacter,
} from "@crossbell/connect-kit";
import { ipfsLinkToHttpLink } from "~/shared/ipfs";
import { useCharacterFollowRelation } from "@crossbell/indexer";
import {
	extractCharacterAvatar,
	extractCharacterName,
} from "@crossbell/util-metadata";
import { composeCharacterHref } from "~/shared/url";

import { Avatar } from "~/shared/components/avatar";
import CharacterIdBadge from "~/shared/components/character/character-id-badge";

// TODO: extract this compose
const FollowButton = ({ characterId }: { characterId: number }) => {
	const currentCharacter = useAccountCharacter();

	const isSelf = currentCharacter?.characterId === characterId;

	const { data: followRelation, isLoadingFollowRelation } =
		useCharacterFollowRelation(currentCharacter?.characterId, characterId);

	const follow = useFollowCharacter();

	const handleFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.stopPropagation();
		follow.mutate({ characterId });
	};

	return isSelf ? (
		<Button className="w-full">
			<Text className="text-[#082135]">Bingo!</Text>
		</Button>
	) : isLoadingFollowRelation ? (
		<Button className="w-full" loading />
	) : followRelation?.isFollowing ? (
		<Button className="w-full" disabled>
			<Text className="text-[#082135]">Following</Text>
		</Button>
	) : (
		<Button
			className="w-full"
			onClick={handleFollow}
			loading={follow.isLoading}
		>
			<Text className="text-[#082135]">Follow</Text>
		</Button>
	);
};

export const TrendingCharacterCard = ({
	character,
}: {
	character: CharacterEntity;
}) => {
	return (
		<Link href={composeCharacterHref(character.handle)} target="_blank">
			<div
				className="flex flex-col rounded-lg text-white p-4 w-full h-full justify-between bg-cover bg-center cursor-pointer transition ease-in-out hover:-translate-y-1"
				style={{
					backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${ipfsLinkToHttpLink(
						extractCharacterAvatar(character) ?? ""
					)})`,
					aspectRatio: "200/250",
				}}
			>
				{/* bio */}
				<div className="text-left text-sm">
					<Text lineClamp={3}>{character.metadata?.content?.bio}</Text>
				</div>

				<div className="flex flex-col">
					<div>
						<CharacterIdBadge character={character} size="lg" />
					</div>

					<Space h={20} />

					<div className="flex flex-col gap-5 items-center">
						{/* avatar */}
						<Avatar
							className="border border-white border-2"
							size={56}
							character={character}
							characterId={character.characterId}
							alt={character.handle}
						/>

						{/* name */}
						<div className="flex flex-col gap-1">
							<Text className="font-bold text-sm">
								{extractCharacterName(character)}
							</Text>
							<Text className="font-bold text-xs">@{character.handle}</Text>
						</div>
					</div>

					{/* actions */}
					<div className="mt-2">
						<FollowButton characterId={character.characterId} />
					</div>
				</div>
			</div>
		</Link>
	);
};

export default TrendingCharacterCard;
