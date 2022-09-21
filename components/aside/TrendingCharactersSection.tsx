import { useTrending } from "@/utils/apis/trending";
import { composeCharacterHref } from "@/utils/url";
import { Group, Skeleton, Space } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";
import Link from "next/link";
import Avatar from "../common/Avatar";
import { CharacterHandle, CharacterName } from "../common/Character";
import FollowButton from "../common/FollowButton";
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
	return (
		<Link href={composeCharacterHref(character.handle)}>
			<div className="px-4 py-2 bg-hover cursor-pointer flex justify-between items-center">
				<Group spacing="xs">
					{/* avatar */}
					<Avatar character={character} size={48} showHoverCard />

					{/* name */}
					<div>
						<div>
							<CharacterName character={character} />
						</div>

						{/* handle */}
						<div>
							<CharacterHandle character={character} size="sm" color="dimmed" />
						</div>
					</div>
				</Group>

				<div>
					<FollowButton character={character} />
				</div>
			</div>
		</Link>
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
