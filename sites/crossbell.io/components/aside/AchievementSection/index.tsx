import React from "react";

import { useAccountCharacter } from "@crossbell/connect-kit";
import { useCharacterByHandle } from "@crossbell/indexer";
import {
	AchievementsStatus,
	useAchievementGroups,
	useAchievementsStatus,
} from "~/shared/apis/achievement";
import { useCharacterRouterQuery } from "~/shared/url";
import exploreImgUrl from "@/public/images/achievement/explore.png";
import mintImgUrl from "@/public/images/achievement/mint.png";

import { Illustration } from "./illustration";
import { Badges } from "./badges";

export function AchievementSection() {
	const { isConnectedCharacter, character } = useCharacterInfos();
	const [achievementGroups, fetchStatus] = useAchievementGroups(character);
	const achievements = React.useMemo(
		() => achievementGroups.flatMap(({ achievements }) => achievements),
		[achievementGroups]
	);
	const status = useAchievementsStatus(achievements);

	if (!character || fetchStatus !== "success") {
		return null;
	}

	switch (status) {
		case AchievementsStatus.empty:
			if (isConnectedCharacter) {
				return <Illustration url={exploreImgUrl} buttonText="Explore" />;
			} else {
				return null;
			}
		case AchievementsStatus.emptyButAbleToMint:
			if (isConnectedCharacter) {
				return <Illustration url={mintImgUrl} buttonText="Mint" />;
			} else {
				return null;
			}
		case AchievementsStatus.haveAchievements:
			return (
				<Badges
					achievements={achievements}
					isConnectedCharacter={isConnectedCharacter}
				/>
			);
	}
}

function useCharacterInfos() {
	const character = useAccountCharacter();
	const { handle } = useCharacterRouterQuery();
	const { data } = useCharacterByHandle(handle);

	return {
		handle,
		isConnectedCharacter: data?.characterId === character?.characterId,
		character: data,
	};
}
