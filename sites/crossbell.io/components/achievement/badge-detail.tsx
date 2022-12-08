import React from "react";
import { Button, Tooltip } from "@mantine/core";
import confetti from "canvas-confetti";

import { composeScanTxHref } from "~/shared/url";
import {
	AchievementInfo,
	AchievementLevelStatus,
	useMintAchievement,
} from "~/shared/apis/achievement";

import { BadgeIcon } from "./badge-icon";
import { BadgeLevels } from "./badge-levels";
import { useBadgeDetailState } from "./hooks";

export type BadgeDetailProps = {
	achievement: AchievementInfo;
	characterId: number;
};

const containerStyle: React.CSSProperties = {
	background: `radial-gradient(136.93% 139.4% at 50% 0%, rgba(234, 199, 255, 0.3) 0%, rgba(90, 53, 120, 0.120313) 59.9%, rgba(21, 26, 30, 0) 100%), #000000`,
};

export function BadgeDetail({ achievement, characterId }: BadgeDetailProps) {
	const { level, selectLevel } = useBadgeDetailState(achievement.levels);
	const { mutateAsync: mintAchievementAsync, status } = useMintAchievement(
		characterId,
		level.id
	);

	const mintAchievement = React.useCallback(() => {
		mintAchievementAsync().then((value) => {
			if (value.status === "MINTED") {
				showConfetti();
			}
		});
	}, [mintAchievementAsync]);

	return (
		<div
			className="flex flex-col items-center overflow-hidden rounded-12px"
			style={containerStyle}
		>
			<div className="w-56% mt-22.4% mb-9.6% mx-auto">
				<BadgeIcon level={level} />
			</div>

			<p className="m-0 p-16px w-full text-white font-500 text-22px leading-28px">
				{achievement.title}
			</p>

			<div className="w-full bg-white">
				<div className="flex items-center p-16px">
					{level.mintId !== null && level.transactionHash && (
						<Tooltip position="top" label={level.transactionHash}>
							<a
								href={composeScanTxHref(level.transactionHash)}
								target="_blank"
								rel="noreferrer"
								className="px-12px py-0 bg-purple-primary rounded-full font-500 text-14px leading-20px text-white tracking-0.1px"
							>
								#{level.mintId}
							</a>
						</Tooltip>
					)}

					<p className="ml-auto mr-0 my-0 font-500 text-14px leading-20px text-[#082135]">
						{level.mintedCount}
						<span className="text-[#687792]"> Minted</span>
					</p>
				</div>

				<div className="px-16px">
					<BadgeLevels
						levels={achievement.levels}
						currentLevelId={level.id}
						size="md"
						onSelect={selectLevel}
						displayDotIfAbleToMint={true}
					/>

					<p className="mt-16px mb-22px text-[#687792] text-16px leading-24px tracking-0.5px">
						{level.description}
					</p>
				</div>

				<hr className="m-0 w-full h-1px border-none bg-[#CFD4D9]" />

				<div className="p-16px">
					<Button
						color="purple"
						className="w-full"
						size="md"
						radius="xl"
						disabled={level.status !== AchievementLevelStatus.ableToMint}
						onClick={mintAchievement}
						loading={status === "loading"}
					>
						{level.status === AchievementLevelStatus.minted ? "Minted" : "Mint"}
					</Button>
				</div>
			</div>
		</div>
	);
}

function showConfetti() {
	const end = Date.now() + 100;
	const config: confetti.Options = {
		particleCount: 25,
		startVelocity: 90,
		angle: 60,
		spread: 60,
		origin: { x: 0, y: 1 },
		zIndex: 300,
		gravity: 1.5,
		colors: ["#6AD991", "#F6C549", "#E65040", "#5B89F7", "#9688F2"],
	};

	(function frame() {
		confetti({
			...config,
			angle: 60,
			origin: { x: 0, y: 1 },
		});

		confetti({
			...config,
			angle: 120,
			origin: { x: 1, y: 1 },
		});

		if (Date.now() < end) {
			requestAnimationFrame(frame);
		}
	})();
}
