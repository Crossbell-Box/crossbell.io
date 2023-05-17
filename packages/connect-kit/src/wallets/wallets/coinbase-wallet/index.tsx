import type { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

import React from "react";

import { Wallet } from "../../index";
import { CoinbaseIcon } from "../../../components";

import styles from "./index.module.css";

export const coinbaseWallet = (
	connector?: CoinbaseWalletConnector
): Wallet | null => {
	if (!connector) return null;

	return {
		id: "coinbaseWallet",
		name: "Coinbase Wallet",
		icon: <CoinbaseIcon className={styles.icon} />,
		installed: isCoinbaseWallet(),
		createConnector: () => {
			return {
				connector,
				async qrCode() {
					return (await connector.getProvider()).qrUrl ?? null;
				},
			};
		},
	};
};

function isCoinbaseWallet(): boolean {
	if (typeof window === "undefined") return false;
	const { ethereum } = window;

	return !!(
		ethereum?.isCoinbaseWallet ||
		(ethereum?.providers &&
			ethereum?.providers.find((provider) => provider.isCoinbaseWallet))
	);
}
