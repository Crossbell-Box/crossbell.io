import { useCharacter } from "@/utils/apis/indexer";
import { stringToInteger } from "@/utils/helpers";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import { extractCharacterAvatar } from "@/utils/metadata";
import { Avatar as Avatar_, AvatarProps } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";
import { PropsWithChildren } from "react";

export default function Avatar({
	characterId,
	character: initialCharacter,
	alt = "Avatar",
	src,
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
	) &
		AvatarProps
>) {
	const { isLoading, data: character } = useCharacter(
		characterId ?? initialCharacter?.characterId,
		{
			enabled: Boolean(characterId) && !Boolean(initialCharacter) && !src,
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
		<Avatar_
			className="bg-coolgray-100"
			src={src_}
			alt={alt}
			radius="xl"
			{...props}
		/>
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
