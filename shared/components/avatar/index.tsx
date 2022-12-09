import React from "react";
import { useCharacter } from "@crossbell/indexer";
import { stringToInteger } from "~/shared/helpers";
import { ipfsLinkToHttpLink } from "@crossbell/util-ipfs";
import { extractCharacterAvatar } from "@crossbell/util-metadata";
import { Avatar as Avatar_, AvatarProps } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";
import { PropsWithChildren } from "react";
import CharacterHoverCard from "~/shared/components/character/character-hover-card";

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

const defaultAvatars = [
	"/images/avatars/bell-black.jpg",
	"/images/avatars/bell-blue.jpg",
	"/images/avatars/bell-green.jpg",
	"/images/avatars/bell-purple.jpg",
	"/images/avatars/bell-red.jpg",
	"/images/avatars/bell-white.jpg",
	"/images/avatars/bell-yellow.jpg",
];

function getDefaultAvatar(handle?: string) {
	if (!handle || (handle.startsWith("0x") && handle.length === 42)) {
		return "/images/avatar-default.png";
	}

	const seededRandomIndex = stringToInteger(handle, {
		min: 0,
		max: defaultAvatars.length - 1,
	});
	return defaultAvatars[seededRandomIndex];
}