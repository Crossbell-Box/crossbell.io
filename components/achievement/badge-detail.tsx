import React from "react";

import type { BadgeLevelInfo } from "./types";
import { BadgeIcon } from "./badge-icon";
import { BadgeLevels } from "./badge-levels";
import { useCurrentBadgeLevel } from "./hooks";

export type BadgeDetailProps = {
	levels: BadgeLevelInfo[];
	currentLevelId: BadgeLevelInfo["id"];
	circleHash: string;
};

const containerStyle: React.CSSProperties = {
	background: `radial-gradient(136.93% 139.4% at 50% 0%, rgba(234, 199, 255, 0.3) 0%, rgba(90, 53, 120, 0.120313) 59.9%, rgba(21, 26, 30, 0) 100%), #000000`,
};

export function BadgeDetail({
	levels,
	currentLevelId,
	circleHash,
}: BadgeDetailProps) {
	const currentLevel = useCurrentBadgeLevel(levels, currentLevelId);

	return (
		<div
			className="flex flex-col items-center overflow-hidden rounded-12px"
			style={containerStyle}
		>
			<div className="w-56% mt-22.4% mb-9.6% mx-auto">
				<BadgeIcon levelInfo={currentLevel} circleHash={circleHash} />
			</div>

			<p className="m-0 p-16px w-full text-white font-500 text-22px leading-28px">
				{currentLevel.title}
			</p>

			<div className="w-full bg-white">
				<div className="flex items-center p-16px">
					{currentLevel.mintId !== null && (
						<div className="px-12px py-0 bg-[#695fde] rounded-full font-500 text-14px leading-20px text-white tracking-0.1px">
							#{currentLevel.mintId}
						</div>
					)}

					<p className="ml-auto mr-0 my-0 font-500 text-14px leading-20px text-[#082135]">
						{currentLevel.minted} <span className="text-[#687792]">Minted</span>
					</p>
				</div>

				<div className="px-16px">
					<BadgeLevels levels={levels} currentLevelId={currentLevelId} />

					<p className="mt-16px mb-22px text-[#687792] text-16px leading-24px tracking-0.5px">
						{currentLevel.description}
					</p>
				</div>

				<hr className="m-0 w-full h-1px border-none bg-[#CFD4D9]" />

				<div className="p-16px">
					<button className="w-full h-40px bg-[#695FDE] border-none text-white rounded-full outline-none cursor-pointer">
						Mint
					</button>
				</div>
			</div>
		</div>
	);
}
