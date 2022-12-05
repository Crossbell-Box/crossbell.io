import React from "react";
import compact from "lodash.compact";
import { AchievementItem, CharacterEntity, Indexer } from "crossbell.js";
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

// const levels: AchievementLevel[] = [
// 	{
// 		id: "base",
// 		title: "Base",
// 		img: "ipfs://bafkreihxutrvld37t4lxf2pjnmq5siajl52kv75pojooyx4pmwdjmi4pca",
// 		description: "Require: 1 people follow",
// 		unitDesc: "Being minted",
// 		progressDesc: "1234/4535",
// 		mintId: null,
// 		mintedCount: 4324,
// 		status: AchievementLevelStatus.minted,
// 	},
// 	{
// 		id: "bronze",
// 		title: "bronze",
// 		img: "ipfs://bafkreiarfgti3xpv2oznl7rzanfbzm7gvklvcwn5poqb53wlhi3n4cwp2a",
// 		description: "Require: 10 people follow",
// 		unitDesc: "Being minted",
// 		progressDesc: "1234/4535",
// 		mintId: null,
// 		mintedCount: 1234,
// 		status: AchievementLevelStatus.ableToMint,
// 	},
// 	{
// 		id: "silver",
// 		title: "silver",
// 		img: "ipfs://bafkreihxutrvld37t4lxf2pjnmq5siajl52kv75pojooyx4pmwdjmi4pca",
// 		description: "Require: 100 people follow",
// 		unitDesc: "Being minted",
// 		progressDesc: "1234/4535",
// 		mintId: 123,
// 		mintedCount: 1234,
// 		status: AchievementLevelStatus.unableToMint,
// 	},
// 	{
// 		id: "gold",
// 		title: "gold",
// 		img: "ipfs://bafkreihxutrvld37t4lxf2pjnmq5siajl52kv75pojooyx4pmwdjmi4pca",
// 		description: "Require: 1000 people follow",
// 		unitDesc: "Being minted",
// 		progressDesc: "1234/4535",
// 		mintId: null,
// 		mintedCount: 1234,
// 		status: AchievementLevelStatus.unableToMint,
// 	},
// 	{
// 		id: "special",
// 		title: "special",
// 		img: "ipfs://bafkreihxutrvld37t4lxf2pjnmq5siajl52kv75pojooyx4pmwdjmi4pca",
// 		description: "Require: 10000 people follow",
// 		unitDesc: "Being minted",
// 		progressDesc: "1234/4535",
// 		mintId: null,
// 		mintedCount: 1234,
// 		status: AchievementLevelStatus.unableToMint,
// 	},
// ];
//
// const achievements: AchievementInfo[] = [
// 	{ title: "Influencer", id: "A", levels },
// 	{ title: "Talking Point", id: "B", levels },
// 	{ title: "Popular NFT", id: "C", levels },
// 	{ title: "Put Notes", id: "D", levels },
// 	{ title: "Mint NFT", id: "E", levels },
// ];
//
// const achievementGroups: AchievementGroup[] = [
// 	{ id: "beginner", title: "Beginner Journey", achievements },
// ];

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
		() => indexer.mintAchievement(characterId, levelId),
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
		() => indexer.getAchievement(characterId!),
		{ enabled: !!characterId }
	);

	const groups = React.useMemo(
		() => formatData(data, character),
		[data, character]
	);

	return [groups, status];
}

function formatData(
	data?: Awaited<ReturnType<Indexer["getAchievement"]>> | null,
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
