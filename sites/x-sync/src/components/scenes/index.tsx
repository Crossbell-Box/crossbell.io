import React from "react";
import { AnimatePresence, m } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";

import { usePreloadImgs } from "@crossbell/util-hooks";

import { breakpoints } from "~/scripts/unocss/breakpoints";

import { Card } from "./components/card";
import { Arrow } from "./components/arrow";
import { CircleBtn } from "./components/circle-btn";
import { Background } from "./components/background";
import { MobileBackground } from "./components/mobile-background";
import { useScenes, illustrations } from "./hooks/use-scenes";
import { useSceneState } from "./hooks/use-scene-state";

export type ScenesProps = {
	onStart: () => void;
};

export function Scenes({ onStart }: ScenesProps) {
	const scenes = useScenes();
	const isSM = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
	const {
		total,
		currentScene,
		currentIndex,
		isFirstIndex,
		isLastIndex,
		goNext,
		goPrev,
	} = useSceneState(scenes);

	usePreloadImgs(illustrations);

	return (
		<div>
			{isSM ? (
				<Background isActive={currentIndex !== 0} />
			) : (
				<MobileBackground />
			)}

			<div className="relative flex w-760px max-w-100vw px-3vw py-3vh">
				{isSM && (
					<AnimatePresence>
						{[
							<m.div
								className="flex-1"
								key={currentIndex}
								transition={{ duration: 0.3 }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{currentScene.illustration}
							</m.div>,
						]}
					</AnimatePresence>
				)}
				<div className="w-350px max-w-90vw mx-auto sm:mx-0 transform -translate-y-1/5 sm:translate-y-0">
					<Card index={currentIndex} total={total} onStart={onStart}>
						{currentScene.description}
					</Card>
				</div>
			</div>

			<div className="absolute top-7/10 sm:top-1/2 left-0 right-0 flex items-center px-16px transform -translate-y-1/2 max-w-1200px mx-auto">
				<CircleBtn className="mr-auto" onClick={goPrev} hidden={isFirstIndex}>
					<Arrow direction="left" />
				</CircleBtn>
				<CircleBtn className="ml-auto" onClick={goNext} hidden={isLastIndex}>
					<Arrow direction="right" />
				</CircleBtn>
			</div>
		</div>
	);
}
