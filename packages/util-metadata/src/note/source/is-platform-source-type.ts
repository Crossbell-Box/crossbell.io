import { PlatformSourceType, SourceType } from "./types";

const map: Record<PlatformSourceType, true> = {
	[SourceType.internalPlatform]: true,
	[SourceType.externalPlatform]: true,
};

export function isPlatformSource(
	source: SourceType,
): source is PlatformSourceType {
	return source in map;
}
