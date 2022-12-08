import React from "react";
import compact from "lodash.compact";
import Image from "next/image";
import Link from "next/link";
import { HoverCard, SimpleGrid, SimpleGridProps, Text } from "@mantine/core";
import classNames from "classnames";

import {
	AchievementInfo,
	AchievementLevelStatus,
	getHighestLevel,
	useFilterAchievements,
} from "~/shared/apis/achievement";

import BaseSection from "@/components/aside/BaseSection";
import { BadgeCompactDetail, BadgeIcon } from "@/components/achievement";
import headerBgUrl from "@/public/images/achievement/header-bg.png";
import { useCharacterRouterQuery } from "~/shared/url";

export type BadgesProps = {
	achievements: AchievementInfo[];
	isConnectedCharacter: boolean;
};

const gridProps: SimpleGridProps = {
	cols: 4,
	spacing: 8,
	breakpoints: [
		{ maxWidth: 1200, cols: 3, spacing: 8 },
		{ maxWidth: 980, cols: 2, spacing: "sm" },
		{ maxWidth: 600, cols: 1, spacing: "sm" },
	],
};

const mintedStatus = [AchievementLevelStatus.minted];

export function Badges({ achievements, isConnectedCharacter }: BadgesProps) {
	const { handle } = useCharacterRouterQuery();
	const mintedAchievements = useFilterAchievements(achievements, mintedStatus);
	const isAbleToMint = useIsAbleToMint(achievements);
	const badgeInfos = useBadgeInfos(mintedAchievements);

	return (
		<BaseSection
			p={0}
			title={
				isConnectedCharacter ? (
					<div className="relative overflow-hidden z-0 px-16px pt-16px pb-8px flex items-center">
						<div className="text-16px font-500 leading-24px tracking-0.15px flex items-start text-[#687792]">
							Achievements
							<Text className="i-csb:two-stars mt-1.75px font-14px" />
						</div>
						<div className="ml-auto">
							<Link
								href={`/@${handle}/achievement`}
								className="flex items-center text-white text-12px leading-16px font-400 hover:underline"
							>
								<span className="relative">
									More badges
									{isAbleToMint && (
										<div className="absolute w-8px h-8px bg-red-primary rounded-full right-0 top-0 transform translate-x-1/1 -translate-y-1/2" />
									)}
								</span>
								<Text
									className={classNames(
										"i-csb:back transform rotate-180 text-16px",
										isAbleToMint && "ml-4px"
									)}
								/>
							</Link>
						</div>
						<div className="absolute -z-1 -right-30px -bottom-48px w-190px opacity-95">
							<Image
								src={headerBgUrl}
								alt="Achievement Section Background Image"
							/>
						</div>
					</div>
				) : (
					<div className="text-16px font-500 leading-24px tracking-0.15px flex items-start px-16px pt-16px pb-8px">
						Achievements
						<Text className="i-csb:two-stars mt-1.75px font-14px" />
					</div>
				)
			}
		>
			{isConnectedCharacter && (
				<hr className="border-none bg-[#E1E8F7] w-full h-1px m-0" />
			)}
			<div className="px-16px pb-16px pt-8px">
				<SimpleGrid {...gridProps}>
					{badgeInfos.map(({ achievement, highestLevel }) => (
						<HoverCard
							key={achievement.id}
							openDelay={150}
							closeDelay={150}
							withinPortal={true}
						>
							<HoverCard.Target>
								<div>
									<BadgeIcon noHoverEffect={true} level={highestLevel} />

									<p className="text-11px font-500 leading-16px tracking-0.5px mt-4px mb-0 text-center color-black truncate">
										{achievement.title}
									</p>
								</div>
							</HoverCard.Target>

							<HoverCard.Dropdown
								p={0}
								className="bg-transparent border-none w-250px !transition-duration-100"
							>
								<BadgeCompactDetail achievement={achievement} />
							</HoverCard.Dropdown>
						</HoverCard>
					))}
				</SimpleGrid>
			</div>
		</BaseSection>
	);
}

function useBadgeInfos(mintedAchievements: AchievementInfo[]) {
	return React.useMemo(
		() =>
			compact(
				mintedAchievements.map((achievement) => {
					const highestLevel = getHighestLevel(achievement.levels, [
						AchievementLevelStatus.minted,
					]);

					return highestLevel ? { achievement, highestLevel } : null;
				})
			),
		[mintedAchievements]
	);
}

function useIsAbleToMint(achievements: AchievementInfo[]): boolean {
	return React.useMemo(
		() =>
			achievements.some((achievement) =>
				achievement.levels.some(
					(level) => level.status === AchievementLevelStatus.ableToMint
				)
			),
		[achievements]
	);
}
