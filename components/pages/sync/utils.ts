import {
	SupportedPlatform,
	useCharacterBoundAccounts,
} from "@/utils/apis/operator-sync";

export function sumUpMediaUsage(
	mediaUsage?: NonNullable<
		ReturnType<typeof useCharacterBoundAccounts>["data"]
	>[number]["media_usage"]
) {
	if (!mediaUsage) {
		return 0;
	}

	const total = mediaUsage.reduce((acc, curr) => acc + curr.usage, 0);

	return total;
}

export function getChangeBioUrl(
	platform: SupportedPlatform,
	identity: string
): string {
	switch (platform) {
		case "medium":
			return "https://medium.com/me/settings";
		case "tiktok":
			return `https://www.tiktok.com/@${identity}`;
	}
}

export function openWindowToChangeBio(
	platform: SupportedPlatform,
	identity: string
) {
	return window.open(getChangeBioUrl(platform, identity), "_blank");
}

export function getPlatformSite(platform: SupportedPlatform): string {
	switch (platform) {
		case "medium":
			return "https://medium.com";
		case "tiktok":
			return `https://www.tiktok.com`;
	}
}

export function openPlatformSite(platform: SupportedPlatform) {
	return window.open(getPlatformSite(platform), "_blank");
}
