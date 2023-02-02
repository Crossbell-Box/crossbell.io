import type { ClientConfig } from "@wagmi/core";
import { configureChains } from "wagmi";
import { crossbell } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";

export const appName = "Crossbell.io";

const configuredChains = configureChains(
	[crossbell],
	[
		jsonRpcProvider({
			rpc: () => ({ http: crossbell.rpcUrls.default.http[0] }),
		}),
	],
	{ pollingInterval: 1_000 }
);

export const chains = configuredChains.chains;
export const provider =
	configuredChains.provider as unknown as ClientConfig["provider"];

export const connectors = [
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
			shimChainChangedDisconnect: false,
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
	new WalletConnectConnector({
		chains,
		options: {
			qrcode: false,
		},
	}),
];
