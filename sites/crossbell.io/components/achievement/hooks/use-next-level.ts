import React from "react";
import { AchievementLevel } from "~/shared/apis/achievement";

export function useNextLevel(
	currentLevel: AchievementLevel,
	levels: AchievementLevel[]
): AchievementLevel | null {
	return React.useMemo(() => {
		const index = levels.findIndex((level) => level.id === currentLevel.id);

		return levels[index + 1] ?? null;
	}, [currentLevel, levels]);
}
