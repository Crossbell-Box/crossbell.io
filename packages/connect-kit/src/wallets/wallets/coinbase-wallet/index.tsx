import type { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

import React from "react";

import { Wallet } from "../../index";
import { CoinbaseIcon } from "../../../components";
import { isCoinbaseWalletInstalled } from "../../../utils";

import styles from "./index.module.css";

export const coinbaseWallet = (
	connector?: CoinbaseWalletConnector,
): Wallet | null => {
	if (!connector) return null;

	return {
		id: "coinbaseWallet",
		name: "Coinbase Wallet",
		icon: <CoinbaseIcon className={styles.icon} />,
		installed: isCoinbaseWalletInstalled(),
		createConnector: () => {
			return {
				connector,
				async qrCode() {
					if (isMobileWeb()) {
						// https://github.com/coinbase/coinbase-wallet-sdk/blob/5bca0ea732476e0a4551a650064f81b35f0057cd/packages/wallet-sdk/src/relay/MobileRelay.ts#L27C25-L29C12
						return `https://www.coinbase.com/connect-dapp?uri=${encodeURIComponent(
							window.location.href,
						)}`;
					}
					return (await connector.getProvider()).qrUrl ?? null;
				},
			};
		},
	};
};

// https://github.com/coinbase/coinbase-wallet-sdk/blob/5bca0ea732476e0a4551a650064f81b35f0057cd/packages/wallet-sdk/src/util.ts#L239C3-L239C3
function isMobileWeb(): boolean {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		window?.navigator?.userAgent,
	);
}
