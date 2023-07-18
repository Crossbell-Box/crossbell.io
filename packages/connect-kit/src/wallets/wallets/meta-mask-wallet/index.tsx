import type { MetaMaskConnector } from "wagmi/connectors/metaMask";
import type { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import React from "react";

import { MetamaskIcon } from "../../../components";
import {
	isAndroid,
	isMobile,
	isIOS,
	getWalletConnectUri,
} from "../../../utils";
import { Wallet } from "../../types";
import styles from "../coinbase-wallet/index.module.css";

function isMetaMask(ethereum: NonNullable<(typeof window)["ethereum"]>) {
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

export const metaMaskWallet = (
	metaMask?: MetaMaskConnector,
	walletConnect?: WalletConnectConnector,
): Wallet | null => {
	if (!metaMask) return null;

	const isMetaMaskInjected =
		typeof window !== "undefined" &&
		typeof window.ethereum !== "undefined" &&
		isMetaMask(window.ethereum);

	const shouldUseWalletConnect = isMobile() && !isMetaMaskInjected;

	return {
		id: "metaMask",
		name: "MetaMask",
		installed: isMetaMaskInjected,
		unavailableDescription: (
			<span>
				You don’t have MetaMask Plugin.
				<br />
				<a href="https://metamask.io" target="_blank">
					Download here
				</a>
				{" and try it again."}
			</span>
		),
		createConnector: () => {
			if (shouldUseWalletConnect && walletConnect) {
				return {
					connector: walletConnect,
					async qrCode() {
						const uri = await getWalletConnectUri(walletConnect);

						return isAndroid()
							? uri
							: isIOS()
							? `metamask://wc?uri=${encodeURIComponent(uri)}`
							: `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
					},
				};
			} else {
				return { connector: metaMask };
			}
		},
		icon: <MetamaskIcon className={styles.icon} />,
	};
};
