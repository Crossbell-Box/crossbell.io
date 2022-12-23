import React from "react";
import { useCharacter } from "@crossbell/indexer";
import { ipfsLinkToHttpLink } from "@crossbell/util-ipfs";
import { extractCharacterAvatar } from "@crossbell/util-metadata";
import { Avatar as Avatar_, AvatarProps } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";
import { PropsWithChildren } from "react";

import CharacterHoverCard from "~/shared/components/character/character-hover-card";
import { getDefaultAvatar } from "~/shared/avatar";

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
	const { isLoading, data: character } = useCharacter(
		characterId ?? initialCharacter?.characterId,
		{
			enabled: Boolean(characterId) && !src,
			initialData: initialCharacter,
		}
	);

	let src_ =
		src ??
		extractCharacterAvatar(character) ??
		(isLoading
			? getDefaultAvatar()
			: extractCharacterAvatar(character) ??
			  getDefaultAvatar(character?.handle));

	src_ = ipfsLinkToHttpLink(src_);

	return (
		<CharacterHoverCard character={character} showHoverCard={showHoverCard}>
			<Avatar_
				className="bg-coolgray-100"
				src={src_}
				alt={alt}
				radius="xl"
				{...props}
			/>
		</CharacterHoverCard>
	);
}
