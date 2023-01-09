import React from "react";
import { useClient } from "wagmi";

import { Wallet } from "../types";

import { metaMaskWallet } from "./meta-mask-wallet";
import { coinbaseWallet } from "./coinbase-wallet";
import { braveWallet } from "./brave-wallet";

export function useWalletConnectors() {
	const { connectors } = useClient();

	return React.useMemo(() => {
		const walletConnectors: Wallet[] = [];

		connectors.forEach((connector) => {
			if (connector.id === "metaMask") {
				walletConnectors.push(
					metaMaskWallet({
						chains: connector.chains,
						options: connector.options,
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
