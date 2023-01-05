import dayjs from "dayjs";
import React from "react";
import { Text } from "@mantine/core";
import { MintedNoteEntity } from "crossbell.js";

import { usePrimaryCharacter } from "@crossbell/indexer";
import { extractCharacterName } from "@crossbell/util-metadata";

import { Avatar } from "~/shared/components/avatar";
import { FollowButton } from "~/shared/components/follow-button";
import { composeCharacterHref, composeScanTxHref } from "~/shared/url";

export type ItemProps = {
	entity: MintedNoteEntity;
};

export function Item({ entity }: ItemProps) {
	const { data: character } = usePrimaryCharacter(entity.owner);

	if (!character) return null;

	const bio = character.metadata?.content?.bio;
	const link = composeCharacterHref(character.handle);
	const characterName = extractCharacterName(character);

	return (
		<div key={entity.tokenId} className="flex items-center gap-[8px] py-12px">
			<a
				href={composeScanTxHref(entity.transactionHash)}
				target="_blank"
				rel="noreferrer"
				className="text-14px font-700 px-10px h-20px flex items-center rounded-8px bg-[#262626] text-[#FFF]"
			>
				#{entity.tokenId}
			</a>
			<a href={link} target="_blank" rel="noreferrer">
				<Avatar size={48} radius="xl" character={character} />
			</a>
			<div className="flex-1 w-0 self-start">
				<div className="mb-2px leading-20px truncate">
					<a
						href={link}
						target="_blank"
						rel="noreferrer"
						className="hover:underline text-14px font-500"
						title={characterName}
					>
						{characterName}
					</a>
				</div>
				{bio && (
					<div
						className="text-12px font-400 truncate leading-16px mb-2px"
						title={bio}
					>
						{bio}
					</div>
				)}
				<div
					className="text-11px font-500 text-[#687792]"
					title={entity.createdAt}
				>
					Minted {dayjs(entity.createdAt).fromNow()} on
					<a
						href={composeScanTxHref(entity.transactionHash)}
						target="_blank"
						rel="noreferrer"
						className="hover:underline text-[#F6C549]"
					>
						<Text className="i-csb:logo inline-block transform translate-y-1/7 ml-4px mr-2px" />
						Crossbell Chain
					</a>
				</div>
			</div>
			<FollowButton character={character} />
		</div>
	);
}
