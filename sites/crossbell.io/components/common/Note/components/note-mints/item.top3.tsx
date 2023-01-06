import React from "react";
import { MintedNoteEntity } from "crossbell.js";

import { extractCharacterName } from "@crossbell/util-metadata";
import { usePrimaryCharacter } from "@crossbell/indexer";

import { FollowButton } from "~/shared/components/follow-button";
import { composeCharacterHref } from "~/shared/url";

import { HighlightAvatar } from "./highlight-avatar";

export type NoteMintsItemProps = {
	entity: MintedNoteEntity;
};

export function ItemTop3({ entity }: NoteMintsItemProps) {
	const { data: character } = usePrimaryCharacter(entity.owner);

	if (!character) return null;

	const isTop1 = entity.tokenId === 1;
	const link = composeCharacterHref(character.handle);

	return (
		<div className="flex flex-col items-center gap-[12px] py-24px w-100px">
			<div className="h-100px flex items-end">
				<HighlightAvatar
					character={character}
					entity={entity}
					size={isTop1 ? 100 : 60}
				>
					{isTop1 && (
						<HighlightCircle className="absolute text-157px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-1 pointer-events-none" />
					)}
				</HighlightAvatar>
			</div>

			<a
				href={link}
				target="_blank"
				rel="noreferrer"
				className="hover:underline font-700 text-14px text-[#687792]"
			>
				{extractCharacterName(character)}
			</a>

			<FollowButton character={character} />
		</div>
	);
}

function HighlightCircle(props: React.SVGAttributes<SVGSVGElement>) {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 157 157"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<circle
				opacity="0.25"
				cx="78.5"
				cy="78.5004"
				r="70.8744"
				stroke="#F6C549"
			/>
			<circle
				opacity="0.5"
				cx="78.5"
				cy="78.4998"
				r="63.7489"
				stroke="#F6C549"
				strokeOpacity="0.6"
			/>
			<circle
				opacity="0.75"
				cx="78.5"
				cy="78.5003"
				r="56.6233"
				stroke="#F6C549"
				strokeOpacity="0.8"
			/>
			<circle cx="78.5" cy="78.4997" r="49.4977" stroke="#F6C549" />
		</svg>
	);
}
