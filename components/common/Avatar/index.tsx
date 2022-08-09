import { useCharacter } from "@/utils/apis/indexer";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import { extractCharacterAvatar } from "@/utils/metadata";
import { Avatar as Avatar_, AvatarProps } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";
import { PropsWithChildren } from "react";

export default function Avatar({
	characterId,
	character: initialCharacter,
	alt = "Avatar",
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
			enabled: Boolean(characterId) && !Boolean(initialCharacter),
			initialData: initialCharacter,
		}
	);

	let src_ =
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

function getDefaultAvatar(handle?: string) {
	if (!handle || handle.startsWith("0x")) {
		return "/images/avatar-default.png";
	}

	return `https://avatars.dicebear.com/api/big-smile/${handle}.svg?background=%23ffffff`;
}
