import React from "react";
import { Tooltip } from "@mantine/core";

import { composeScanTxHref } from "~/shared/url";

import { BadgeIcon } from "./badge-icon";
import { BadgeLevels } from "./badge-levels";
import { useBadgeDetailState } from "./hooks";
import { BadgeDetailProps } from "./badge-detail";

const containerStyle: React.CSSProperties = {
	background: `radial-gradient(136.93% 139.4% at 50% 0%, rgba(234, 199, 255, 0.3) 0%, rgba(90, 53, 120, 0.120313) 59.9%, rgba(21, 26, 30, 0) 100%), #000000`,
	boxShadow: "0px 0px 16px rgba(83, 113, 172, 0.25)",
};

export type BadgeCompactDetailProps = Pick<BadgeDetailProps, "achievement">;

export function BadgeCompactDetail({ achievement }: BadgeCompactDetailProps) {
	const { level, selectLevel } = useBadgeDetailState(achievement.levels);

	return (
		<div
			className="flex flex-col items-center overflow-hidden rounded-12px"
			style={containerStyle}
		>
			<div className="w-56% mt-22.4% mb-9.6% mx-auto">
				<BadgeIcon level={level} />
			</div>

			<p className="m-0 p-8px w-full text-white font-500 text-14px leading-20px">
				{achievement.title}
			</p>

			<div className="w-full bg-white">
				<div className="flex items-center p-8px">
					{level.mintId !== null && level.transactionHash && (
						<Tooltip position="top" label={level.transactionHash}>
							<a
								href={composeScanTxHref(level.transactionHash)}
								target="_blank"
								rel="noreferrer"
								className="px-6px py-0 bg-purple-primary rounded-full font-500 text-11px leading-16px text-white tracking-0.5px"
							>
								#{level.mintId}
							</a>
						</Tooltip>
					)}

					<p className="ml-auto mr-0 my-0 font-500 text-11px leading-16px text-[#082135]">
						{level.mintedCount}
						<span className="text-[#687792]"> Minted</span>
					</p>
				</div>

				<div className="px-8px">
					<BadgeLevels
						levels={achievement.levels}
						currentLevelId={level.id}
						size="sm"
						onSelect={selectLevel}
						displayDotIfAbleToMint={false}
					/>

					<p className="mt-8px mb-11px text-[#687792] text-12px leading-16px tracking-0.4px">
						{level.description}
					</p>
				</div>
			</div>
		</div>
	);
}
