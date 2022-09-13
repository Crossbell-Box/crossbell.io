import React from "react";

import type { BadgeLevelInfo } from "./types";
import { BadgeLevelsItem } from "./badge-levels.item";

export type BadgeLevelsProps = {
	levels: BadgeLevelInfo[];
	currentLevelId: BadgeLevelInfo["id"];
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

export function BadgeLevels({ levels, currentLevelId }: BadgeLevelsProps) {
	const lastIndex = levels.length - 1;

	return (
		<div className="flex items-center">
			{levels.map((level, index) => {
				const isSelected = level.id === currentLevelId;
				return (
					<React.Fragment key={level.id}>
						<BadgeLevelsItem level={level} isSelected={isSelected} />

						{index !== lastIndex && (
							<div
								className="w-40px h-3px mx-2px"
								style={isSelected ? lineStyle.activated : lineStyle.inactive}
							/>
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
}
