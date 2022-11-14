export const OPERATOR_ADDRESS = "0x0f588318a494e4508a121a32b6670b5494ca3357";

export const SUPPORTED_PLATFORMS = [
	"medium",
	"tiktok",
	"pinterest",
	"twitter",
	"tg_channel",
	"substack",
	"pixiv",
] as const;

export type SupportedPlatform = typeof SUPPORTED_PLATFORMS[number];

const PLATFORM_DISPLAY_STATUS_MAP: Record<SupportedPlatform, boolean> = {
	medium: true,
	tiktok: false,
	pinterest: false,
	twitter: true,
	tg_channel: true,
	substack: true,
	pixiv: false,
};

export function isShowPlatform(platform: SupportedPlatform): boolean {
	return PLATFORM_DISPLAY_STATUS_MAP[platform];
}

export function isSupportedPlatform(
	platform: string
): platform is SupportedPlatform {
	const p = platform.toLowerCase();
	return SUPPORTED_PLATFORMS.includes(p as any);
}

/**
 * This returns a handle text to verify on web2 platform's bio section.
 * @example "song" => "song@crossbell"
 */
export function getVeriHandle(handle: string) {
	return `${handle}@crossbell`;
}

/**
 * @example ("medium", "songkeys") => "https://medium.com/@songkeys"
 */
export function getPlatformUserProfileUrl(
	platform: SupportedPlatform,
	identity: string
): string {
	switch (platform) {
		case "medium":
			return `https://medium.com/@${identity}`;
		case "tiktok":
			return `https://www.tiktok.com/@${identity}`;
		case "pinterest":
			return `https://www.pinterest.com/${identity}`;
		case "twitter":
			return `https://twitter.com/${identity}`;
		case "tg_channel":
			return `https://t.me/${identity}`;
		case "substack":
			return `https://${identity}.substack.com`;
		case "pixiv":
			return `https://www.pixiv.net/users/${identity}`;
	}
}

export function getPlatformDisplayName(platform: SupportedPlatform): string {
	const map: Record<SupportedPlatform, string> = {
		tiktok: "TikTok",
		medium: "Medium",
		pinterest: "Pinterest",
		twitter: "Twitter",
		substack: "Substack",
		pixiv: "Pixiv",
		tg_channel: "Telegram Channel",
	};

	return map[platform] ?? platform;
}

export function getPlatformIdentityKind(platform: SupportedPlatform): string {
	switch (platform) {
		case "pixiv":
			return "id";
		case "tg_channel":
			return "username";
		default:
			return "name";
	}
}
