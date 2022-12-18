import React from "react";
import { CharacterEntity } from "crossbell.js";

import { Avatar } from "~/shared/components/avatar";
import classNames from "classnames";

export type HighlightAvatarProps = {
	character: CharacterEntity;
	size: number;
	rank: number;
	showHoverCard?: boolean;
	children?: React.ReactNode;
};

export function HighlightAvatar({
	rank,
	character,
	size,
	showHoverCard,
	children,
}: HighlightAvatarProps) {
	const isTop1 = rank === 1;
	return (
		<div className="relative z-0">
			{children}

			<div
				className={classNames(
					"absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 text-[#FFF] rounded-8px z-1 px-10px h-20px flex items-center whitespace-nowrap text-14px font-700",
					isTop1 ? "bg-[#F6C549]" : "bg-[#6F6F6F]"
				)}
			>
				#{rank}
			</div>

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
		</div>
	);
}
