import { configureChains } from "wagmi";
import { crossbell } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { getWalletConnectLegacyConnector } from "./wallets/wallet-connectors/get-wallet-connect-legacy-connector";

import type { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import type { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";

export type GetDefaultClientConfigOptions = {
	appName: string;
};

type Connectors = [
	InjectedConnector,
	MetaMaskConnector,
	CoinbaseWalletConnector,
	WalletConnectConnector | WalletConnectLegacyConnector
];

export function getDefaultClientConfig({
	appName,
}: GetDefaultClientConfigOptions): {
	autoConnect: boolean;
	connectors: Connectors;
	publicClient: ReturnType<typeof configureChains>["publicClient"];
} {
	const { chains, publicClient } = configureChains(
		[crossbell],
		[publicProvider()],
		{ pollingInterval: 1_000 }
	);

	const connectors: Connectors = [
		new InjectedConnector({
			chains,
			options: {
				shimDisconnect: true,
				name: (detectedName) =>
					`Injected (${
						typeof detectedName === "string"
							? detectedName
							: detectedName.join(", ")
					})`,
			},
		}),
		new MetaMaskConnector({
			chains,
			options: {
				shimDisconnect: true,
				UNSTABLE_shimOnConnectSelectAccount: true,
			},
		}),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName,
				headlessMode: true,
			},
		}),
		getWalletConnectLegacyConnector({
			chains,
			options: { qrcode: true, chainId: chains[0].id },
		}),
	];

	return {
		autoConnect: true,
		connectors,
		publicClient,
	};
}
