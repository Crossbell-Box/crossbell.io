import { CharacterMetadata, utils } from "crossbell.js";
import {
	isSupportedPlatform,
	SupportedPlatform,
	SUPPORTED_PLATFORMS,
} from "./constants";

type ParsedConnectedAccount = {
	platform: SupportedPlatform;
	identity: string;
};

export function parseConnectedAccounts(
	connected_accounts?: CharacterMetadata["connected_accounts"]
) {
	const connectedAccounts: ParsedConnectedAccount[] = [];

	connected_accounts?.forEach((csbUri) => {
		try {
			const account = utils.parseCsbUri(csbUri);
			const { identity, platform } = account;
			if (platform && identity && isSupportedPlatform(platform)) {
				connectedAccounts.push({ identity, platform });
			}
		} catch {
			// do nothing
		}
	});

	return connectedAccounts;
}

export function calculateUnconnectedPlatforms(
	parsedConnectedAccounts: ParsedConnectedAccount[]
) {
	const unconnectedPlatforms = SUPPORTED_PLATFORMS.filter(
		(platform) =>
			!parsedConnectedAccounts.some((account) => account.platform === platform)
	);

	return unconnectedPlatforms;
}
