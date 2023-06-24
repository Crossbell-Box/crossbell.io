import React from "react";
import compact from "lodash.compact";
import { AchievementItem, CharacterEntity, Indexer } from "crossbell";
import {
	QueryStatus,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

import { indexer } from "@crossbell/indexer";

import {
	AchievementGroup,
	AchievementInfo,
	AchievementLevel,
	AchievementLevelStatus,
} from "./types";

const SCOPE_KEY = ["indexer", "achievement"];

const SCOPE_KEY_ACHIEVEMENT_GROUP = (
	characterId?: number,
	levelId?: AchievementLevel["id"]
) => compact([...SCOPE_KEY, "group", characterId, levelId]);

const statusMap: Record<AchievementItem["status"], AchievementLevelStatus> = {
	INACTIVE: AchievementLevelStatus.unableToMint,
	MINTABLE: AchievementLevelStatus.ableToMint,
	MINTED: AchievementLevelStatus.minted,
};

export function useMintAchievement(
	characterId: number,
	levelId: AchievementLevel["id"]
) {
	const queryClient = useQueryClient();

	return useMutation(
		[...SCOPE_KEY, "note", characterId, levelId],
		() => indexer.achievement.mint(characterId, levelId),
		{
			onSuccess: (data) => {
				if (data) {
					return queryClient.invalidateQueries(
						SCOPE_KEY_ACHIEVEMENT_GROUP(characterId)
					);
				}
			},
		}
	);
}

export function useAchievementGroups(
	character?: CharacterEntity | null
): [AchievementGroup[], QueryStatus] {
	const characterId = character?.characterId;

	const { data, status } = useQuery(
		SCOPE_KEY_ACHIEVEMENT_GROUP(characterId),
		() => indexer.achievement.getMany(characterId!),
		{ enabled: !!characterId }
	);

	const groups = React.useMemo(
		() => formatData(data, character),
		[data, character]
	);

	return [groups, status];
}

function formatData(
	data?: Awaited<ReturnType<Indexer["achievement"]["getMany"]>> | null,
	character?: CharacterEntity | null
): AchievementGroup[] {
	return (
		data?.list.map(
			(rawGroup): AchievementGroup => ({
				title: rawGroup.info.title,
				id: rawGroup.info.name,
				achievements: rawGroup.groups.map(
					(rawInfo): AchievementInfo => ({
						title: rawInfo.info.title,
						id: rawInfo.info.name,
						levels: rawInfo.items.map(
							(rawLevel): AchievementLevel => ({
								id: rawLevel.tokenId,
								img: rawLevel.info.media,
								description: rawLevel.info.description,
								unitDesc: rawLevel.info.unit,
								progressDesc: rawLevel.info.targetValue
									? `${rawLevel.currentValue}/${rawLevel.info.targetValue}`
									: `${rawLevel.currentValue}`,
								mintId: rawLevel.tokenNumber,
								mintedCount: rawLevel.stat.mintedCount ?? 0,
								status: statusMap[rawLevel.status],
								contractAddress: "0x3D1b588a6Bcd728Bb61570ced6656eA4C05e404f", // All achievements are the same,
								mintedAt: rawLevel.mintedAt,
								ownerHandle: character?.handle ?? "",
								transactionHash: rawLevel.transactionHash,
							})
						),
					})
				),
			})
		) ?? []
	);
}
