import React from "react";
import { Connector, useConfig } from "wagmi";
import compact from "lodash.compact";

import type { MetaMaskConnector } from "wagmi/connectors/metaMask";
import type { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import type { InjectedConnector } from "wagmi/connectors/injected";
import type { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";

import type { OKXConnector } from "../connectors";
import { metaMaskWallet } from "./meta-mask-wallet";
import { coinbaseWallet } from "./coinbase-wallet";
import { braveWallet } from "./brave-wallet";
import { okxWallet } from "./okx-wallet";

enum KnownConnector {
	metaMask = "metaMask",
	okx = "okx",
	coinbaseWallet = "coinbaseWallet",
	injected = "injected",
	walletConnectLegacy = "walletConnectLegacy",
}

type ConnectorMap = Partial<{
	[KnownConnector.okx]: OKXConnector;
	[KnownConnector.metaMask]: MetaMaskConnector;
	[KnownConnector.coinbaseWallet]: CoinbaseWalletConnector;
	[KnownConnector.injected]: InjectedConnector;
	[KnownConnector.walletConnectLegacy]: WalletConnectLegacyConnector;
}>;

export function useWalletConnectors() {
	const { connectors } = useConfig();
	const connectorMap = React.useMemo(
		() => getConnectorMap(connectors),
		[connectors],
	);

	return React.useMemo(
		() =>
			compact([
				okxWallet(connectorMap.okx),
				metaMaskWallet(connectorMap.metaMask, connectorMap.walletConnectLegacy),
				coinbaseWallet(connectorMap.coinbaseWallet),
				braveWallet(connectorMap.injected),
			]),
		[connectors],
	);
}

function getConnectorMap(connectors: Connector<any, any>[]) {
	const result: Record<string, Connector<any, any>> = {};

	connectors.forEach((connector) => {
		result[connector.id] = connector;
	});

	return result as ConnectorMap;
}
