import { useWeb2Url } from "@crossbell/ipfs-react";
import React from "react";
import Image from "next/image";
import classNames from "classnames";

import { ipfsGateway } from "@/utils/ipfs";

import type { BadgeLevelInfo } from "./types";

export type BadgeLevelsItemProps = {
	level: BadgeLevelInfo;
	isSelected: boolean;
};

export function BadgeLevelsItem({ level, isSelected }: BadgeLevelsItemProps) {
	const url = useWeb2Url(level.img) ?? level.img;

	return (
		<div
			className={classNames(
				"relative w-48px h-48px rounded-full border-2 border-solid border-[#695FDE] border-opacity-0",
				isSelected && "border-opacity-100"
			)}
		>
			<Image unoptimized src={url} layout="fill" alt={`${level.title} Badge`} />
		</div>
	);
}
