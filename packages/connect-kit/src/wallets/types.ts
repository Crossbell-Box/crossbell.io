import { Chain as WagmiChain, Connector } from "wagmi";
import React from "react";

export type Chain = WagmiChain;

export type WalletConnector = {
	connector: Connector;
	qrCode?: () => Promise<string | null>;
};

export type Wallet = {
	id: string;
	name: string;
	installed: boolean;
	unavailableDescription?: React.ReactNode;
	icon: React.ReactNode;
	createConnector: () => WalletConnector;
};
