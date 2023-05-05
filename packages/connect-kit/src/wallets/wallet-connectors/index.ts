import React from "react";
import { Connector, useConfig } from "wagmi";

import { Wallet } from "../types";

import { metaMaskWallet } from "./meta-mask-wallet";
import { coinbaseWallet } from "./coinbase-wallet";
import { braveWallet } from "./brave-wallet";

export function useWalletConnectors() {
	const { connectors } = useConfig();

	return React.useMemo(() => {
		const walletConnectors: Wallet[] = [];
		const walletConnectProjectId = findWalletConnectProjectId(connectors);

		connectors.forEach((connector) => {
			if (connector.id === "metaMask") {
				walletConnectors.push(
					metaMaskWallet({
						chains: connector.chains,
						options: connector.options,
						walletConnectProjectId,
					})
				);
			}

			if (connector.id === "coinbaseWallet") {
				walletConnectors.push(
					coinbaseWallet({
						chains: connector.chains,
						appName: "Crossbell.io",
					})
				);
			}

			if (connector.id === "injected") {
				const brave = braveWallet(connector);

				if (brave.installed) {
					walletConnectors.push(brave);
				}
			}
		});

		return walletConnectors;
	}, [connectors]);
}

function findWalletConnectProjectId(connectors: Connector[]): string | null {
	for (const connector of connectors) {
		if (connector.id === "walletConnect" && !!connector.options?.projectId) {
			return connector.options.projectId;
		}
	}

	return null;
}
