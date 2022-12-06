import {
	getPlatformUserProfileUrl,
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
		case "twitter":
			return `https://twitter.com/settings/profile`;
		case "pinterest":
			return `https://www.pinterest.com/settings/edit-profile`;
		case "pixiv":
			return `https://www.pixiv.net/settings/profile`;
		case "substack":
			return identity
				? `https://${identity}.substack.com/publish/settings`
				: getPlatformSite("substack");
		case "tiktok":
		case "tg_channel":
		case "jike":
			return getPlatformUserProfileUrl(platform, identity);
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
		case "pinterest":
			return `https://www.pinterest.com`;
		case "twitter":
			return `https://twitter.com`;
		case "tg_channel":
			return `https://telegram.org`;
		case "substack":
			return `https://substack.com`;
		case "pixiv":
			return `https://www.pixiv.net`;
		case "jike":
			return `https://www.okjike.com/`;
	}
}

export function openPlatformSite(platform: SupportedPlatform) {
	return window.open(getPlatformSite(platform), "_blank");
}
