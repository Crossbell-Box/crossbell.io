import React from "react";
import classNames from "classnames";

import type { AchievementLevel } from "~/shared/apis/achievement";
import { BadgeLevelsItem, BadgeLevelsItemProps } from "./badge-levels.item";

export type BadgeLevelsProps = {
	levels: AchievementLevel[];
	currentLevelId: AchievementLevel["id"];
	size: "md" | "sm";
	displayDotIfAbleToMint: BadgeLevelsItemProps["displayDotIfAbleToMint"];
	onSelect: (level: AchievementLevel) => void;
};

const lineStyle = {
	inactive: {
		background:
			"linear-gradient(270deg, #798188 0%, rgba(172, 180, 188, 0) 103.75%)",
	},

	activated: {
		background:
			"linear-gradient(270deg, #695FDE 0%, rgba(105, 95, 222, 0) 103.75%)",
	},
};

export function BadgeLevels({
	levels,
	currentLevelId,
	size,
	onSelect,
	displayDotIfAbleToMint,
}: BadgeLevelsProps) {
	const lastIndex = levels.length - 1;

	return (
		<div className="flex items-center">
			{levels.map((level, index) => {
				const isSelected = level.id === currentLevelId;
				const handleClick = () => onSelect(level);

				return (
					<React.Fragment key={level.id}>
						<div className="flex-shrink-0" onClick={handleClick}>
							<BadgeLevelsItem
								level={level}
								isSelected={isSelected}
								size={size}
								displayDotIfAbleToMint={displayDotIfAbleToMint}
							/>
						</div>

						{index !== lastIndex && (
							<div
								className={classNames(
									size === "sm" && "w-20px h-1.5px mx-1px",
									size === "md" && "w-40px h-3px mx-2px"
								)}
								style={isSelected ? lineStyle.activated : lineStyle.inactive}
							/>
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
}
