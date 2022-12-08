import {
	AchievementInfo,
	AchievementLevelStatus,
	AchievementLevel,
} from "./types";

export function getHighestLevel(
	levels: AchievementInfo["levels"],
	filter: AchievementLevelStatus[]
): AchievementLevel | null {
	for (let i = levels.length; i > 0; i--) {
		const level = levels[i - 1];

		if (filter.includes(level.status)) {
			return level;
		}
	}

	return null;
}
