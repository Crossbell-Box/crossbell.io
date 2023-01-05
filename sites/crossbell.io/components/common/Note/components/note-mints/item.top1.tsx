import dayjs from "dayjs";
import React from "react";
import { Text } from "@mantine/core";
import { MintedNoteEntity } from "crossbell.js";

import { usePrimaryCharacter } from "@crossbell/indexer";
import { extractCharacterName } from "@crossbell/util-metadata";

import { FollowButton } from "~/shared/components/follow-button";
import { composeCharacterHref, composeScanTxHref } from "~/shared/url";

import { HighlightAvatar } from "./highlight-avatar";

export type ItemTop1Props = {
	entity: MintedNoteEntity;
};

export function ItemTop1({ entity }: ItemTop1Props) {
	const { data: character } = usePrimaryCharacter(entity.owner);

	if (!character) return null;

	const bio = character.metadata?.content?.bio;
	const link = composeCharacterHref(character.handle);
	const characterName = extractCharacterName(character);

	return (
		<div key={entity.tokenId} className="flex items-center gap-[8px] py-12px">
			<a href={link} target="_blank" rel="noreferrer">
				<HighlightAvatar size={96} entity={entity} character={character}>
					<HighlightCircle className="absolute text-135px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-1 pointer-events-none" />
				</HighlightAvatar>
			</a>

			<div className="flex-1 w-0">
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

function HighlightCircle(props: React.SVGAttributes<SVGSVGElement>) {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 135 135"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<circle
				opacity="0.25"
				cx="67.5"
				cy="67.5004"
				r="60.8729"
				stroke="#F6C549"
			/>
			<circle
				opacity="0.5"
				cx="67.5"
				cy="67.4997"
				r="54.7458"
				stroke="#F6C549"
				strokeOpacity="0.6"
			/>
			<circle
				opacity="0.75"
				cx="67.5"
				cy="67.5001"
				r="48.6188"
				stroke="#F6C549"
				strokeOpacity="0.8"
			/>
			<circle cx="67.5001" cy="67.4995" r="42.4917" stroke="#F6C549" />
		</svg>
	);
}
