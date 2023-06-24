import React from "react";
import { HoverCard, Text, Group, Stack } from "@mantine/core";
import { CharacterEntity } from "crossbell";
import { CharacterHandle, CharacterName } from ".";
import { Avatar } from "~/shared/components/avatar";
import { useCharacterFollowStats } from "@crossbell/indexer";
import { useState } from "react";
import { FollowButton } from "~/shared/components/follow-button";

export default function CharacterHoverCard({
	character,
	showHoverCard = true,
	children,
}: {
	character?: CharacterEntity | null;
	showHoverCard?: boolean;
	children: React.ReactNode;
}) {
	const [opened, setOpened] = useState(false);

	const { data: followStats } = useCharacterFollowStats(
		character?.characterId,
		{ enabled: Boolean(character) && opened }
	);

	if (!character || !showHoverCard) return <>{children}</>;

	return (
		<HoverCard
			width={320}
			shadow="md"
			withArrow
			withinPortal
			openDelay={200}
			closeDelay={200}
			onOpen={() => {
				setOpened(true);
			}}
		>
			<HoverCard.Target>{children}</HoverCard.Target>
			<HoverCard.Dropdown>
				<Group position="apart">
					<Group>
						<Avatar character={character} />
						<Stack spacing={5}>
							<CharacterName character={character} />
							<CharacterHandle character={character} size="sm" color="dimmed" />
						</Stack>
					</Group>

					<FollowButton character={character} />
				</Group>

				<Text size="sm" mt="md" lineClamp={3}>
					{character.metadata?.content?.bio}
				</Text>

				<Group mt="md" spacing="xl">
					<Text size="sm">
						<b>{followStats?.followingCount ?? "..."}</b> Following
					</Text>
					<Text size="sm">
						<b>{followStats?.followersCount ?? "..."}</b> Followers
					</Text>
				</Group>
			</HoverCard.Dropdown>
		</HoverCard>
	);
}
