import React from "react";

import {
	AchievementInfo,
	AchievementLevelStatus,
	AchievementsStatus,
} from "./types";

export function useAchievementsStatus(
	achievements: AchievementInfo[]
): AchievementsStatus {
	return React.useMemo(() => {
		let ableToMintCount = 0;
		console.log(achievements)

		for (const achievement of achievements) {
			const statusSet = new Set(achievement.levels.map(({ status }) => status));

			if (statusSet.has(AchievementLevelStatus.minted)) {
				return AchievementsStatus.haveAchievements;
			}

			if (statusSet.has(AchievementLevelStatus.ableToMint)) {
				ableToMintCount += 1;
			}
		}

		return ableToMintCount > 0
			? AchievementsStatus.emptyButAbleToMint
			: AchievementsStatus.empty;
	}, [achievements]);
}
