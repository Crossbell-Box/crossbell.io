import React from "react";
import classNames from "classnames";

import type { AchievementLevel } from "~/shared/apis/achievement";
import { AchievementLevelStatus } from "~/shared/apis/achievement";

import { BadgeImage } from "./badge-image";

export type BadgeLevelsItemProps = {
	level: AchievementLevel;
	isSelected: boolean;
	size: "md" | "sm";
	displayDotIfAbleToMint: boolean;
};

export function BadgeLevelsItem({
	level,
	isSelected,
	size,
	displayDotIfAbleToMint,
}: BadgeLevelsItemProps) {
	return (
		<div className="relative z-0">
			{displayDotIfAbleToMint &&
				level.status === AchievementLevelStatus.ableToMint && (
					<div className="absolute top-2px right-0 w-12px h-12px bg-red-primary rounded-full z-1" />
				)}
			<div
				className={classNames(
					"relative rounded-full overflow-hidden border-solid border-purple-primary border-opacity-0 cursor-pointer",
					size === "md" && "w-48px h-48px border-2",
					size === "sm" && "w-26px h-26px border-1",
					isSelected ? "border-opacity-100" : "hover:border-opacity-50"
				)}
			>
				<BadgeImage level={level} />
			</div>
		</div>
	);
}
