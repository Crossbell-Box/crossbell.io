import React from "react";

import { type AchievementInfo, AchievementLevelStatus } from "./types";

export function useFilterAchievements(
	achievements: AchievementInfo[],
	validStatus: AchievementLevelStatus[]
): AchievementInfo[] {
	return React.useMemo(
		() =>
			achievements.filter(({ levels }) =>
				levels.some(({ status }) => validStatus.includes(status))
			),
		[achievements, validStatus]
	);
}
