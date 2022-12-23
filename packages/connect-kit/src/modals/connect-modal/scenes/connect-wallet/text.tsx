import React from "react";

import { Wallet } from "../../../../wallets";

import { ConnectStatus } from "./types";

export const STATUS_TEXT_MAP: Record<
	ConnectStatus,
	(wallet: Wallet) => { title: string; description: string }
> = {
	[ConnectStatus.NOT_CONNECTED]: (wallet) => ({
		title: `Login to ${wallet.name}`,
		description: `To continue, please login to your ${wallet.name} extension.`,
	}),
	[ConnectStatus.CONNECTING]: () => ({
		title: "Requesting Connection",
		description:
			"Accept the request through your wallet to connect to this app.",
	}),
	[ConnectStatus.CONNECTED]: () => ({
		title: "Connected",
		description: "It is now okay to close this popup",
	}),
	[ConnectStatus.FAILED]: () => ({
		title: "Connection Failed",
		description: "Sorry, something went wrong.\nPlease try connecting again.",
	}),
	[ConnectStatus.REJECTED]: () => ({
		title: "Request Cancelled",
		description: "You cancelled the request.\nClick above to try again.",
	}),
	[ConnectStatus.UNAVAILABLE]: (wallet) => ({
		title: "Unsupported Browser",
		description: `To connect your ${wallet.name} wallet,\ninstall the extension on your browser.`,
	}),
};
