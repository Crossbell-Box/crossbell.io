import { Chain as WagmiChain, Connector } from "wagmi";
import React from "react";

export type Chain = WagmiChain;

export type WalletConnector = {
	connector: Connector;
	chainId?: number;
	qrCode?: () => Promise<string | null>;
};

export type Wallet = {
	id: string;
	name: string;
	installed: boolean;
	icon: React.ReactNode;
	createConnector: () => WalletConnector;
};
