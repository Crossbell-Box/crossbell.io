import React from "react";

import type { AchievementInfo } from "~/shared/apis/achievement";
import { AchievementLevelStatus } from "~/shared/apis/achievement";

import { BadgeIcon } from "./badge-icon";
import { useNextLevel, usePreferredLevel } from "./hooks";

export type BadgeProps = {
	achievement: AchievementInfo;
};

export function Badge({ achievement }: BadgeProps) {
	const currentLevel = usePreferredLevel(achievement.levels);
	const nextLevel = useNextLevel(currentLevel, achievement.levels);
	const isAbleToMintNewLevel = React.useMemo(
		() =>
			achievement.levels.some(
				({ status }) => status === AchievementLevelStatus.ableToMint
			),
		[achievement]
	);

	return (
		<div className="flex flex-col items-center">
			<div className="w-full max-w-140px">
				<BadgeIcon level={currentLevel} />
			</div>
			<h4 className="font-600 text-16px leading-24px flex items-center justify-center mt-16px mb-0 truncate">
				{isAbleToMintNewLevel && (
					<div className="w-12px h-12px rounded-full bg-red-primary mr-6px" />
				)}
				{achievement.title}
			</h4>
			<p className="m-0 text-12px font-400 leading-16px flex items-center truncate">
				<span className="text-purple-primary mr-4px empty:mr-0">
					{currentLevel.status === AchievementLevelStatus.minted && nextLevel
						? nextLevel.progressDesc
						: currentLevel.progressDesc}
				</span>
				<span className="text-[#7b8089]">{currentLevel.unitDesc}</span>
			</p>
		</div>
	);
}
