import React from "react";
import Image from "next/image";
import classNames from "classnames";
import { useWeb2Url } from "@crossbell/ipfs-react";

import {
	AchievementLevel,
	AchievementLevelStatus,
} from "~/shared/apis/achievement";

export type BadgeImageProps = React.HTMLAttributes<HTMLDivElement> & {
	level: AchievementLevel;
};

export function BadgeImage({ level, ...props }: BadgeImageProps) {
	const web2Url = useWeb2Url(level.img);

	return (
		<div
			className={classNames(
				"relative w-full h-full",
				level.status !== AchievementLevelStatus.minted && "filter grayscale"
			)}
			{...props}
		>
			<Image
				unoptimized={!!web2Url}
				fill
				src={web2Url ?? level.img}
				alt="Badge"
			/>
		</div>
	);
}
