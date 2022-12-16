import { useTrending } from "~/shared/apis/trending";
import { composeCharacterHref } from "~/shared/url";
import { Group, Skeleton } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";
import { useRouter } from "next/router";
import { Avatar } from "~/shared/components/avatar";
import { CharacterHandle, CharacterName } from "~/shared/components/character";
import { FollowButton } from "~/shared/components/follow-button";
import BaseSection from "./BaseSection";

export default function TrendingCharactersSection() {
	const { data, isLoading } = useTrending("character");

	const characters =
		data?.pages.flatMap(
			({ items }) =>
				items?.map((character) => (
					<CharacterListItem
						character={character}
						key={character.characterId}
					/>
				)) ?? []
		) ?? [];

	if (isLoading) {
		return (
			<BaseSection title="Trending Characters">
				{Array(5)
					.fill(0)
					.map((_, i) => (
						<CharacterListItemSkeleton key={i} />
					))}
			</BaseSection>
		);
	}

	if (characters.length > 0) {
		return (
			<BaseSection title="Trending Characters">
				{characters.slice(0, 5)}
			</BaseSection>
		);
	}

	return null;
}

function CharacterListItem({ character }: { character: CharacterEntity }) {
	const handlePushCharacter = () => {
		window.open(composeCharacterHref(character.handle), "_blank");
	};

	return (
		<div
			className="px-4 py-2 bg-hover cursor-pointer flex justify-between items-center"
			onClick={handlePushCharacter}
		>
			<Group spacing="xs">
				{/* avatar */}
				<Avatar character={character} size={48} showHoverCard />

				{/* name */}
				<div>
					<div>
						<CharacterName character={character} showHoverCard />
					</div>

					{/* handle */}
					<div>
						<CharacterHandle
							character={character}
							size="sm"
							color="dimmed"
							showHoverCard
						/>
					</div>
				</div>
			</Group>

			<div>
				<FollowButton character={character} />
			</div>
		</div>
	);
}

function CharacterListItemSkeleton() {
	return (
		<div className="px-4 py-2 bg-hover cursor-pointer flex justify-between items-center">
			<Group spacing="xs">
				{/* avatar */}
				<Skeleton height={48} circle />

				{/* name */}
				<div>
					<div>
						<Skeleton height="1em" width="3em" />
					</div>

					{/* handle */}
					<div>
						<Skeleton height="0.75em" width="3em" />
					</div>
				</div>
			</Group>
		</div>
	);
}
