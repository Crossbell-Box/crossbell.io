import { NoteMetadata } from "crossbell.js";

import { KnownSource } from "./types";
import { getKnownSource } from "./get-known-source";

const map: Record<KnownSource, (externalUrls: string[]) => string | null> = {
	[KnownSource.operatorSync]: () => {
		return "/sync";
	},

	[KnownSource.sync]: () => {
		return "/sync";
	},

	[KnownSource.crossSync]: () => {
		return "https://crosssync.app/";
	},

	[KnownSource.xlog]: (externalUrls) => {
		return externalUrls[0] ?? null;
	},

	[KnownSource.twitter]: (externalUrls) => {
		return findUrlIncludes(externalUrls, "twitter.com");
	},

	[KnownSource.medium]: (externalUrls) => {
		return findUrlIncludes(externalUrls, "medium.com");
	},

	[KnownSource.tiktok]: (externalUrls) => {
		return findUrlIncludes(externalUrls, "tiktok.com");
	},
};

export function getSourceLink(
	source: string,
	noteMetadata?: NoteMetadata | null
): string | null {
	const knownSource = getKnownSource(source);
	if (knownSource) {
		return map[knownSource](noteMetadata?.external_urls ?? []);
	} else {
		return null;
	}
}

function findUrlIncludes(urls: string[], pattern: string): string | null {
	return urls.find((u) => u.includes(pattern)) ?? urls[0] ?? null;
}
