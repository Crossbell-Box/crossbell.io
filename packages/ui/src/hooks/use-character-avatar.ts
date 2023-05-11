import React from "react";
import { CharacterEntity } from "crossbell";
import { useCharacter } from "@crossbell/indexer";
import { extractCharacterAvatar } from "@crossbell/util-metadata";

import { getDefaultAvatarIpfsUrl } from "../utils";
import { useWeb2Url } from "../ipfs";

export type UseCharacterAvatarParams = {
	characterId?: number | null;
	character?: CharacterEntity | null;
	disabled?: boolean;
};

export function useCharacterAvatar({
	character,
	characterId,
	disabled,
}: UseCharacterAvatarParams) {
	const { isLoading, data = character } = useCharacter(characterId, {
		enabled: !!characterId && !disabled && !character,
	});

	const rawSrc = React.useMemo(
		() => extractCharacterAvatar(data) ?? getDefaultAvatarIpfsUrl(data?.handle),
		[data, isLoading]
	);

	const src = useWeb2Url(rawSrc);

	return React.useMemo(() => ({ src, character: data }), [src, data]);
}
