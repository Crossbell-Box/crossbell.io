import React from "react";
import { CharacterEntity } from "crossbell.js";
import { useCharacterAvatar } from "@crossbell/ui";
import { extractCharacterName } from "@crossbell/util-metadata";

export type CharacterAvatarProps = React.ImgHTMLAttributes<HTMLImageElement> & {
	character?: CharacterEntity;
	characterId?: CharacterEntity["characterId"];
	size: string | number;
	radius?: string | number;
};

export const CharacterAvatar = React.forwardRef<
	HTMLImageElement,
	CharacterAvatarProps
>(
	(
		{ characterId, character, size, radius = "100vh", style, src, ...props },
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
				{...props}
			/>
		);
	}
);
