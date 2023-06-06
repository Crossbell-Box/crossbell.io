import React from "react";

import { OKXConnector } from "../../connectors";
import { OKXIcon } from "../../../components";
import { Wallet } from "../../types";

import styles from "../coinbase-wallet/index.module.css";

export const okxWallet = (connector?: OKXConnector): Wallet | null => {
	if (!connector) return null;

	const installed = typeof window !== "undefined" && !!window.okxwallet;

	return installed
		? {
				id: "okx",
				name: "OKX Wallet",
				installed: installed,
				icon: <OKXIcon className={styles.icon} />,
				createConnector: () => ({ connector }),
		  }
		: null;
};
