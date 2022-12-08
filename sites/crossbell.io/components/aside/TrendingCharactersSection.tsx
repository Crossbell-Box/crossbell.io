import { useTrending } from "~/shared/apis/trending";
import { composeCharacterHref } from "~/shared/url";
import { Group, Skeleton, Space } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";
import Link from "next/link";
import { useRouter } from "next/router";
import Avatar from "../common/Avatar";
import { CharacterHandle, CharacterName } from "../common/Character";
import { FollowButton } from "~/shared/components/follow-button";
import BaseSection from "./BaseSection";

export default function TrendingCharactersSection() {
	const { data, isLoading } = useTrending(["character"]);

	const notes = data?.character?.slice(0, 5);

	return (
		<BaseSection title="Trending Characters">
			{isLoading
				? Array(5)
						.fill(0)
						.map((_, i) => <CharacterListItemSkeleton key={i} />)
				: notes?.map((character, i) => (
						<CharacterListItem
							character={character}
							key={character.characterId}
						/>
				  ))}
		</BaseSection>
	);
}

function CharacterListItem({ character }: { character: CharacterEntity }) {
	const router = useRouter();

	const handlePushCharacter = () =>
		router.push(composeCharacterHref(character.handle));

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
