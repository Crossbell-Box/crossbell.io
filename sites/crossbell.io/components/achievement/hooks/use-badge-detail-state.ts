import React from "react";

import { AchievementLevel } from "~/shared/apis/achievement";

import { getPreferredLevel } from "./use-preferred-level";

export function useBadgeDetailState(
	levels: AchievementLevel[],
	defaultLevelId?: AchievementLevel["id"]
) {
	const [levelId, setLevelId] = React.useState(defaultLevelId);

	return React.useMemo(
		() => ({
			level: getPreferredLevel(levels, levelId),

			selectLevel({ id }: Pick<AchievementLevel, "id">) {
				setLevelId(id);
			},
		}),
		[levels, levelId]
	);
}
