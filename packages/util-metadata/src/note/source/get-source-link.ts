import { NoteMetadata } from "crossbell";

import { KnownSource } from "./types";
import { getKnownSource } from "./get-known-source";

export function getSourceLink(
	source: string,
	noteMetadata?: NoteMetadata | null
): string | null {
	const knownSource = getKnownSource(source);
	const external_urls = noteMetadata?.external_urls ?? [];
	const defaultUrl = external_urls[0] ?? null;

	if (knownSource) {
		switch (knownSource) {
			case KnownSource.sync:
			case KnownSource.xsync:
			case KnownSource.crossSync:
			case KnownSource.operatorSync:
				return "https://xsync.app";
			case KnownSource.xlog:
				return defaultUrl;
			case KnownSource.twitter:
				return findUrlIncludes(external_urls, "twitter.com");
			case KnownSource.medium:
				return findUrlIncludes(external_urls, "medium.com");
			case KnownSource.tiktok:
				return findUrlIncludes(external_urls, "tiktok.com");
			case KnownSource.substack:
				return findUrlIncludes(external_urls, "substack.com");
			case KnownSource.pixiv:
				return findUrlIncludes(external_urls, "pixiv.com");
			case KnownSource.telegram:
				return findUrlIncludes(external_urls, "t.me");
			case KnownSource.pinterest:
				return findUrlIncludes(external_urls, "pinterest.com");
			case KnownSource.jike:
				return findUrlIncludes(external_urls, "okjike.com");
		}
	} else {
		return defaultUrl;
	}
}

function findUrlIncludes(urls: string[], pattern: string): string | null {
	return urls.find((u) => u.includes(pattern)) ?? urls[0] ?? null;
}
