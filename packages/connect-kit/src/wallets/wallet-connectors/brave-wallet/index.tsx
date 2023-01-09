import { InjectedConnector } from "wagmi/connectors/injected";
import React from "react";

import { BraveIcon } from "../../../components";
import { Chain, Wallet } from "../../types";

import styles from "../coinbase-wallet/index.module.css";

export interface BraveWalletOptions {
	chains: Chain[];
}

export const braveWallet = ({ chains }: BraveWalletOptions): Wallet => {
	const installed =
		typeof window !== "undefined" && window.ethereum?.isBraveWallet === true;

	return {
		id: "brave",
		name: "Brave Wallet",
		installed: installed,
		icon: <BraveIcon className={styles.icon} />,
		createConnector: () => {
			return {
				connector: new InjectedConnector({
					chains,
					options: { shimDisconnect: true },
				}),
			};
		},
	};
};
