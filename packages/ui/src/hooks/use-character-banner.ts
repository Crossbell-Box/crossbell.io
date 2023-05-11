import React from "react";
import { CharacterEntity } from "crossbell";
import { useCharacter } from "@crossbell/indexer";
import { extractCharacterBanners } from "@crossbell/util-metadata";

import { useWeb2Url } from "../ipfs";

export type UseCharacterBannerParams = {
	characterId?: number | null;
	character?: CharacterEntity | null;
};

export type UseCharacterBannerResult = {
	url: string;
	kind: "image" | "video";
} | null;

export function useCharacterBanner({
	character,
	characterId,
}: UseCharacterBannerParams): UseCharacterBannerResult {
	const enabled = !!characterId && !character;
	const { data = character } = useCharacter(characterId, { enabled });
	const banner = React.useMemo(() => extractCharacterBanners(data)[0], [data]);

	const url = useWeb2Url(banner?.address ?? "");
	const mimeType = banner?.mime_type?.toLowerCase() ?? "";

	if (mimeType.startsWith("image")) {
		return { url, kind: "image" };
	}

	if (mimeType.startsWith("video")) {
		return { url, kind: "video" };
	}

	return null;
}
