import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import React from "react";

import Image from "@/components/common/Image";
import metaMaskUrl from "@/public/images/connect-kit/wallet-logos/meta-mask.svg";

import { Chain, Wallet } from "../../types";
import { isAndroid } from "../../../utils";
import { getWalletConnectConnector } from "../get-wallet-connect-connector";
import { ConnectStatus } from "./connect-status";

export interface MetaMaskWalletOptions {
	chains: Chain[];
	options?: NonNullable<
		ConstructorParameters<typeof MetaMaskConnector>[0]
	>["options"];
}

function isMetaMask(ethereum: NonNullable<typeof window["ethereum"]>) {
	// Logic borrowed from wagmi's MetaMaskConnector
	// https://github.com/tmm/wagmi/blob/main/packages/core/src/connectors/metaMask.ts
	const isMetaMask = Boolean(ethereum.isMetaMask);

	if (!isMetaMask) {
		return false;
	}

	// Brave tries to make itself look like MetaMask
	// Could also try RPC `web3_clientVersion` if following is unreliable
	if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) {
		return false;
	}

	if (ethereum.isTokenPocket) {
		return false;
	}

	if (ethereum.isTokenary) {
		return false;
	}

	return true;
}

export const metaMaskWallet = ({
	chains,
	options,
}: MetaMaskWalletOptions): Wallet => {
	const isMetaMaskInjected =
		typeof window !== "undefined" &&
		typeof window.ethereum !== "undefined" &&
		isMetaMask(window.ethereum);

	const shouldUseWalletConnect = !isMetaMaskInjected;

	return {
		id: "metaMask",
		name: "MetaMask",
		installed: isMetaMaskInjected,
		icon: (
			<Image fill src={metaMaskUrl} placeholder="empty" alt="MetaMask Logo" />
		),
		ConnectStatus,
		createConnector: () => {
			if (shouldUseWalletConnect) {
				const connector = getWalletConnectConnector({ chains });

				return {
					connector,
					async qrCode() {
						const { uri } = (await connector.getProvider()).connector;

						return isAndroid()
							? uri
							: `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
					},
				};
			} else {
				return {
					connector: new MetaMaskConnector({ chains, options }),
				};
			}
		},
	};
};
