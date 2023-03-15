import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import React from "react";

import { MetamaskIcon } from "../../../components";
import { isAndroid, isMobile } from "../../../utils";
import { Chain, Wallet } from "../../types";
import { getWalletConnectConnector } from "../get-wallet-connect-connector";
import { getWalletConnectLegacyConnector } from "../get-wallet-connect-legacy-connector";
import styles from "../coinbase-wallet/index.module.css";

export interface MetaMaskWalletOptions {
	chains: Chain[];
	options?: NonNullable<
		ConstructorParameters<typeof MetaMaskConnector>[0]
	>["options"];
	walletConnectProjectId: string | null;
}

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

export const metaMaskWallet = ({
	chains,
	options,
	walletConnectProjectId,
}: MetaMaskWalletOptions): Wallet => {
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
			if (shouldUseWalletConnect) {
				const connector = walletConnectProjectId
					? getWalletConnectConnector({
							chains,
							options: { projectId: walletConnectProjectId },
					  })
					: getWalletConnectLegacyConnector({
							chains,
							options: { qrcode: true, chainId: chains[0].id },
					  });

				return {
					connector,
					async qrCode() {
						const { uri } = ((await connector.getProvider()) as any)?.connector;

						return isAndroid()
							? uri
							: `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
					},
				};
			} else {
				return {
					connector: new MetaMaskConnector({
						chains,
						options: {
							shimDisconnect: true,
							shimChainChangedDisconnect: false,
							UNSTABLE_shimOnConnectSelectAccount: true,
							...options,
						},
					}),
				};
			}
		},
		icon: <MetamaskIcon className={styles.icon} />,
	};
};
