import { useCharacter, usePrimaryCharacter } from "@/utils/apis/indexer";
import { Avatar as Avatar_, AvatarProps } from "@mantine/core";
import { type BigNumberish } from "ethers";
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
		characterId?: string;
		src?: string;
		alt?: string;
	} & AvatarProps<any>
>) {
	const { isLoading, data } = useCharacter(characterId);

	const src_ =
		src ??
		(isLoading
			? getDefaultAvatar(address)
			: data?.avatars?.[0] ?? getDefaultAvatar(address));

	return <Avatar_ src={src_} alt={alt} radius="xl" {...props} />;
}

function getDefaultAvatar(addr: string = "0x0") {
	return `https://cdn.stamp.fyi/avatar/${addr}?s=64`;
}
