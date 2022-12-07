import React from "react";
import { useClient } from "wagmi";

import { Wallet } from "../types";

import { metaMaskWallet } from "./meta-mask-wallet";
import { coinbaseWallet } from "./coinbase-wallet";

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
		});

		return walletConnectors;
	}, [connectors]);
}
