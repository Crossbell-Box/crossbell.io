export enum KnownSource {
	operatorSync = "operatorsync",
	crossSync = "crosssync",
	xlog = "xlog",
	twitter = "twitter",
	medium = "medium",
	tiktok = "tiktok",
}

export enum SourceType {
	internalPlatform = "internal-platform",
	externalPlatform = "external-platform",
	syncTool = "sync-tool",
	unknown = "unknown",
}

export type PlatformSourceType =
	| SourceType.internalPlatform
	| SourceType.externalPlatform;
