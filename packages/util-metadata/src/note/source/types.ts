export enum KnownSource {
	operatorSync = "operatorsync",
	sync = "sync",
	xsync = "xsync",
	crossSync = "crosssync",
	xlog = "xlog",
	twitter = "twitter",
	medium = "medium",
	tiktok = "tiktok",
	substack = "substack",
	pixiv = "pixiv",
	telegram = "telegram",
	pinterest = "pinterest",
	jike = "jike",
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
