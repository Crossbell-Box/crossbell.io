import React from "react";
import dayjs from "dayjs";
import { Text } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";

import { extractCharacterName } from "@crossbell/util-metadata";

import { composeCharacterHref, composeScanTxHref } from "~/shared/url";
import { Avatar } from "~/shared/components/avatar";
import { FollowButton } from "~/shared/components/follow-button";

export type ItemProps = {
	character?: CharacterEntity | null;
	createdAt?: string | null;
	transactionHash?: string | null;
};

export function Item({ character, createdAt, transactionHash }: ItemProps) {
	if (!character) return null;

	const bio = character.metadata?.content?.bio;
	const link = composeCharacterHref(character.handle);
	const characterName = extractCharacterName(character);

	return (
		<div className="flex items-center gap-[8px] py-12px">
			<a href={link} target="_blank" rel="noreferrer">
				<Avatar size={48} radius="xl" character={character} />
			</a>
			<div className="flex-1 w-0 self-start">
				<div className="mb-2px truncate">
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
				{createdAt && (
					<div className="text-11px font-500 text-[#687792]" title={createdAt}>
						Liked {dayjs(createdAt).fromNow()}
						{transactionHash && (
							<>
								{` on`}
								<a
									href={composeScanTxHref(transactionHash)}
									target="_blank"
									rel="noreferrer"
									className="hover:underline text-[#F6C549]"
								>
									<Text className="i-csb:logo inline-block transform translate-y-1/7 ml-4px mr-2px" />
									Crossbell Chain
								</a>
							</>
						)}
					</div>
				)}
			</div>
			<FollowButton character={character} />
		</div>
	);
}
