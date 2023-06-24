import React from "react";
import { Avatar as Avatar_, AvatarProps } from "@mantine/core";
import { CharacterEntity } from "crossbell";
import { PropsWithChildren } from "react";

import CharacterHoverCard from "~/shared/components/character/character-hover-card";

import { useCharacterAvatar } from "@crossbell/ui";

export function Avatar({
	characterId,
	character: initialCharacter,
	alt = "Avatar",
	src,
	showHoverCard = false,
	...props
}: PropsWithChildren<
	(
		| {
				characterId?: number | null;
				character?: CharacterEntity | null;
		  }
		| {
				characterId?: never;
				character: CharacterEntity;
		  }
	) & {
		showHoverCard?: boolean;
	} & AvatarProps
>) {
	const { src: avatarSrc, character } = useCharacterAvatar({
		character: initialCharacter,
		characterId,
		disabled: !!src,
	});

	return (
		<CharacterHoverCard character={character} showHoverCard={showHoverCard}>
			<Avatar_
				className="bg-coolgray-100"
				src={src ?? avatarSrc}
				alt={alt}
				radius="xl"
				{...props}
			/>
		</CharacterHoverCard>
	);
}
