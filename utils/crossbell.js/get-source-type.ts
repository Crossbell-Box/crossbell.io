import { KnownSource, SourceType } from "./types";
import { getKnownSource } from "./get-known-source";

const map: Record<KnownSource, SourceType> = {
	[KnownSource.xlog]: SourceType.platform,
	[KnownSource.twitter]: SourceType.platform,
	[KnownSource.medium]: SourceType.platform,
	[KnownSource.tiktok]: SourceType.platform,

	[KnownSource.operatorSync]: SourceType.syncTool,
	[KnownSource.crossSync]: SourceType.syncTool,
};

export function getSourceType(source: string): SourceType {
	const knownSource = getKnownSource(source);
	if (knownSource) {
		return map[knownSource];
	} else {
		return SourceType.unknown;
	}
}
