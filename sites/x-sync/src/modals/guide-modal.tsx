import React from "react";
import classNames from "classnames";
import { Text } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";

import { usePreloadImgs } from "@crossbell/util-hooks";

import { openBorderlessModal } from "~/shared/components/modal";
import { Image } from "~/shared/components/image";

import { CircleBtn, Arrow } from "@/components/scenes/components";
import {
	modalIllustrations,
	useScenes,
	useSceneState,
} from "@/components/scenes/hooks";

const closeModals = () => closeAllModals();

export function openGuideModal() {
	openBorderlessModal({
		zIndex: 10000,
		children: <GuideModal />,
		classNames: { modal: "rounded-24px overflow-hidden w-694px" },
	});
}

export function GuideModal() {
	const scenes = useScenes();
	const state = useSceneState(scenes);

	usePreloadImgs(modalIllustrations);

	return (
		<div className="relative bg-white flex min-h-335px">
			<div className="relative basis-0 flex-grow min-h-full">
				<Image
					fill={true}
					placeholder="empty"
					key={state.currentIndex}
					src={state.currentScene.modalIllustration}
					className="object-cover"
				/>
			</div>
			<div className="basis-0 flex-grow bg-[#F8F8FA]">
				<div className="p-24px flex flex-col min-h-full">
					<button
						onClick={closeModals}
						className="absolute right-24px top-24px w-32px h-32px transition bg-[#C5C5C5] hover:bg-[#C5C5C5]/90 active:bg-[#C5C5C5] flex items-center justify-center border-none rounded-full cursor-pointer"
					>
						<Text className="i-csb:close text-24px text-white" />
					</button>

					<div className="text-28px leading-36px text-blue-primary mt-56px">
						{state.currentIndex + 1}
					</div>

					<p className="text-16px leading-24px mb-0 mt-16px color-[#1C1C1C] mb-auto">
						{(() => {
							const { description } = state.currentScene;

							if (typeof description === "string") {
								const [firstWord, ...words] = description.split(" ");

								return (
									<>
										<span className="text-28px leading-36px">{firstWord}</span>
										{" " + words.join(" ")}
									</>
								);
							} else {
								return description;
							}
						})()}
					</p>

					<div className="flex items-center justify-center w-full mt-auto mb-12px">
						{Array.from({ length: state.total }).map((_, i) => (
							<div
								key={i}
								className={classNames(
									"w-4px h-4px rounded-full mx-4px transform transition",
									i === state.currentIndex
										? "scale-200 bg-black/40"
										: "scale-100 bg-black/20"
								)}
							/>
						))}
					</div>

					<div className="flex items-center w-169px mx-auto">
						<CircleBtn size={32} className="mr-auto" onClick={state.goPrev}>
							<Arrow direction="left" width={8.67} height={14.67} />
						</CircleBtn>
						<CircleBtn size={32} className="ml-auto" onClick={state.goNext}>
							<Arrow direction="right" width={8.67} height={14.67} />
						</CircleBtn>
					</div>
				</div>
			</div>
		</div>
	);
}
