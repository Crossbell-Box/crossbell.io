import React from "react";

import {
	AchievementLevel,
	AchievementLevelStatus,
	getHighestLevel,
} from "~/shared/apis/achievement";

export function usePreferredLevel(
	levels: AchievementLevel[],
	preferredLevelId?: AchievementLevel["id"]
) {
	return React.useMemo(
		() => getPreferredLevel(levels, preferredLevelId),
		[levels, preferredLevelId]
	);
}

export function getPreferredLevel(
	levels: AchievementLevel[],
	preferredLevelId?: AchievementLevel["id"]
) {
	const level = preferredLevelId
		? levels.find(({ id }) => id === preferredLevelId)
		: null;

	return (
		level ??
		getHighestLevel(levels, [AchievementLevelStatus.minted]) ??
		levels[0]
	);
}
