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
			? getDefaultAvatar(address)
			: data?.metadata?.content?.avatars?.[0] ?? getDefaultAvatar(address));

	src_ = ipfsLinkToHttpLink(src_);

	return <Avatar_ src={src_} alt={alt} radius="xl" {...props} />;
}

function getDefaultAvatar(addr: string = "0x0") {
	if (addr === "0x0") {
		return "/images/avatar-default.png";
	}

	return `https://cdn.stamp.fyi/avatar/${addr}?s=64`;
}
