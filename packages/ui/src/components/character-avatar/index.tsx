import React from "react";
import classNames from "classnames";
import { CharacterEntity } from "crossbell";
import { useCharacterAvatar } from "@crossbell/ui";
import { extractCharacterName } from "@crossbell/util-metadata";

import styles from "./index.module.css";

export type CharacterAvatarProps = React.ImgHTMLAttributes<HTMLImageElement> & {
	character?: CharacterEntity | null;
	characterId?: CharacterEntity["characterId"] | null;
	size: string | number;
	radius?: string | number;
};

export const CharacterAvatar = React.forwardRef<
	HTMLImageElement,
	CharacterAvatarProps
>(
	(
		{
			characterId,
			character,
			size,
			radius = "100vh",
			style,
			src,
			className,
			...props
		},
		ref
	) => {
		const avatar = useCharacterAvatar({
			characterId,
			character,
			disabled: !!src,
		});

		return (
			<img
				src={src ?? avatar.src}
				alt={`${extractCharacterName(avatar.character)} Avatar`}
				style={{ ...style, width: size, height: size, borderRadius: radius }}
				ref={ref}
				className={classNames(className, styles.img)}
				{...props}
			/>
		);
	}
);
