import { useCharacter } from "@crossbell/indexer";
import { extractCharacterAvatar } from "@crossbell/util-metadata";
import { ipfsLinkToHttpLink } from "@crossbell/util-ipfs";
import { CharacterEntity } from "crossbell.js";

import { getDefaultAvatar } from "~/shared/avatar";
import React from "react";

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
	const { isLoading, data } = useCharacter(
		characterId ?? character?.characterId,
		{
			enabled: !!characterId && !disabled,
			initialData: character,
		}
	);

	return React.useMemo(
		() => ({
			src: ipfsLinkToHttpLink(
				extractCharacterAvatar(data) ??
					(isLoading
						? getDefaultAvatar()
						: extractCharacterAvatar(data) ?? getDefaultAvatar(data?.handle))
			),
			character: data,
		}),
		[data, isLoading]
	);
}
