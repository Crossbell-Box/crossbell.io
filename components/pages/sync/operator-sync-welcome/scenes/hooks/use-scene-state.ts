import React from "react";

import { SceneConfig } from "../types";

export function useSceneState(scenes: SceneConfig[]) {
	const idToSceneMap = React.useMemo(
		() =>
			scenes.reduce((map, scene) => {
				map[scene.id] = scene;
				return map;
			}, {} as Record<SceneConfig["id"], SceneConfig>),
		[scenes]
	);

	const [currentIndex, setCurrentIndex] = React.useState(0);

	return React.useMemo(() => {
		const move = (direction: number) => {
			const nextIndex =
				(scenes.length + currentIndex + direction) % scenes.length;

			setCurrentIndex(nextIndex);
		};

		return {
			currentIndex,
			total: scenes.length,
			currentScene: idToSceneMap[scenes[currentIndex].id],
			isFirstIndex: currentIndex === 0,
			isLastIndex: currentIndex === scenes.length - 1,
			goNext: () => move(1),
			goPrev: () => move(-1),
		};
	}, [scenes, idToSceneMap, currentIndex]);
}
