export const OPERATOR_ADDRESS = "0x0f588318a494e4508a121a32b6670b5494ca3357";

export const SUPPORTED_PLATFORMS = ["medium", "tiktok"] as const;

export type SupportedPlatform = typeof SUPPORTED_PLATFORMS[number];

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
) {
	switch (platform) {
		case "medium":
			return `https://medium.com/@${identity}`;
		case "tiktok":
			return `https://www.tiktok.com/@${identity}`;
	}
}
