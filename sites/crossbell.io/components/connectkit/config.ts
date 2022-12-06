import { Chain, configureChains } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";

export const appName = "Crossbell.io";

const crossbellChain: Chain = {
	id: 3737,
	name: "Crossbell",
	network: "crossbell",
	// @ts-ignore
	iconUrl: "/images/logo.svg",
	iconBackground: "#fff",
	nativeCurrency: {
		decimals: 18,
		name: "CSB",
		symbol: "CSB",
	},
	rpcUrls: {
		default: "https://rpc.crossbell.io",
	},
	blockExplorers: {
		default: { name: "CrossScan", url: "https://scan.crossbell.io" },
	},
	testnet: false,
};

export const { chains, provider } = configureChains(
	[crossbellChain],
	[jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })],
	{ pollingInterval: 1_000 }
);

export const connectors = [
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
];
