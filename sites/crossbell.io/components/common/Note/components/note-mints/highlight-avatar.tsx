import React from "react";
import { CharacterEntity, MintedNoteEntity } from "crossbell.js";

import { Avatar } from "~/shared/components/avatar";
import classNames from "classnames";
import { composeCharacterHref, composeScanTxHref } from "~/shared/url";

export type HighlightAvatarProps = {
	character: CharacterEntity;
	size: number;
	showHoverCard?: boolean;
	entity: MintedNoteEntity;
	children?: React.ReactNode;
};

export function HighlightAvatar({
	character,
	size,
	showHoverCard,
	children,
	entity,
}: HighlightAvatarProps) {
	const isTop1 = entity.tokenId === 1;

	return (
		<div className="relative z-0">
			{children}

			<a
				href={composeScanTxHref(entity.transactionHash)}
				target="_blank"
				rel="noreferrer"
				className={classNames(
					"absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 text-[#FFF] rounded-8px z-1 px-10px h-20px flex items-center whitespace-nowrap text-14px font-700",
					isTop1 ? "bg-[#F6C549]" : "bg-[#6F6F6F]"
				)}
			>
				#{entity.tokenId}
			</a>

			<a
				href={composeCharacterHref(character.handle)}
				target="_blank"
				rel="noreferrer"
			>
				<Avatar
					radius={999}
					character={character}
					size={size}
					showHoverCard={showHoverCard}
					className={classNames(
						"border-3",
						isTop1 ? "border-[#F6C549]" : "border-[#6F6F6F]"
					)}
				/>
			</a>
		</div>
	);
}
