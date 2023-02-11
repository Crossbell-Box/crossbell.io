import { KnownSource, SourceType } from "./types";
import { getKnownSource } from "./get-known-source";

const map: Record<KnownSource, SourceType> = {
	[KnownSource.xlog]: SourceType.internalPlatform,
	[KnownSource.twitter]: SourceType.externalPlatform,
	[KnownSource.medium]: SourceType.externalPlatform,
	[KnownSource.tiktok]: SourceType.externalPlatform,
	[KnownSource.substack]: SourceType.externalPlatform,
	[KnownSource.pixiv]: SourceType.externalPlatform,
	[KnownSource.telegram]: SourceType.externalPlatform,
	[KnownSource.pinterest]: SourceType.externalPlatform,
	[KnownSource.jike]: SourceType.externalPlatform,

	[KnownSource.operatorSync]: SourceType.syncTool,
	[KnownSource.xsync]: SourceType.syncTool,
	[KnownSource.sync]: SourceType.syncTool,
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
