import React from "react";

import type { BadgeLevelInfo } from "./types";
import { BadgeIcon } from "./badge-icon";
import styles from "./badge.module.css";

export type BadgeProps = {
	levels: BadgeLevelInfo[];
	currentLevelId: BadgeLevelInfo["id"];
	circleHash: string;
};

export function Badge(props: BadgeProps) {
	const currentLevel = useCurrentLevel(props);

	if (!currentLevel) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.iconContainer}>
				<BadgeIcon levelInfo={currentLevel} circleHash={props.circleHash} />
			</div>
			<h4 className={styles.title}>
				<div className={styles.redDot} />
				{currentLevel.title}
			</h4>
			<p className={styles.progress}>
				<span className={styles.progressInfo}>{currentLevel.progressDesc}</span>
				<span className={styles.progressUnit}>{currentLevel.unitDesc}</span>
			</p>
		</div>
	);
}

function useCurrentLevel({
	levels,
	currentLevelId,
}: BadgeProps): BadgeLevelInfo | null {
	return React.useMemo(
		() => levels.find((level) => level.id === currentLevelId) ?? levels[0],
		[levels, currentLevelId]
	);
}
