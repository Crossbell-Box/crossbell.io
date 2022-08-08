import { useCharacter, usePrimaryCharacter } from "@/utils/apis/indexer";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import { Avatar as Avatar_, AvatarProps } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function Avatar({
	address,
	characterId,
	src,
	alt = "Avatar",
	...props
}: PropsWithChildren<
	{
		address?: string;
		characterId?: number | null;
		src?: string;
		alt?: string;
	} & AvatarProps
>) {
	const { isLoading, data } = useCharacter(characterId);

	let src_ =
		src ??
		(isLoading
			? getDefaultAvatar()
			: data?.metadata?.content?.avatars?.[0] ??
			  getDefaultAvatar(data?.handle));

	src_ = ipfsLinkToHttpLink(src_);

	return <Avatar_ src={src_} alt={alt} radius="xl" {...props} />;
}

function getDefaultAvatar(handle?: string) {
	if (!handle || handle.startsWith("0x")) {
		return "/images/avatar-default.png";
	}

	return `https://avatars.dicebear.com/api/big-smile/${handle}.svg?background=%23ffffff`;
}
