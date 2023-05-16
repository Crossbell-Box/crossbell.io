import { InjectedConnector } from "wagmi/connectors/injected";
import React from "react";

import { BraveIcon } from "../../../components";
import { Wallet } from "../../types";

import styles from "../coinbase-wallet/index.module.css";

export const braveWallet = (connector?: InjectedConnector): Wallet | null => {
	if (!connector) return null;

	const installed =
		typeof window !== "undefined" && window.ethereum?.isBraveWallet === true;

	return installed
		? {
				id: "brave",
				name: "Brave Wallet",
				installed: installed,
				icon: <BraveIcon className={styles.icon} />,
				createConnector: () => ({ connector }),
		  }
		: null;
};
