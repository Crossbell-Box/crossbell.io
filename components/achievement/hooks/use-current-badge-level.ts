import React from "react";

import type { BadgeLevelInfo } from "../types";

export function useCurrentBadgeLevel(
	levels: BadgeLevelInfo[],
	currentLevelId: BadgeLevelInfo["id"]
): BadgeLevelInfo {
	return React.useMemo(
		() => levels.find(({ id }) => id === currentLevelId) ?? levels[0],
		[levels, currentLevelId]
	);
}
