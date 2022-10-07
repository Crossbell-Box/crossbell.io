import React from "react";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
	injectedWallet,
	rainbowWallet,
	metaMaskWallet,
	coinbaseWallet,
	walletConnectWallet,
	braveWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
	type Chain,
	configureChains,
	createClient,
	createStorage,
} from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { type RainbowKitProviderProps } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider";
import "@rainbow-me/rainbowkit/styles.css";

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

const { chains, provider } = configureChains(
	[crossbellChain],
	[jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })],
	{ pollingInterval: 1_000 }
);

const connectors = connectorsForWallets([
	{
		groupName: "Popular",
		wallets: [
			metaMaskWallet({ chains, shimDisconnect: true }),
			walletConnectWallet({ chains }),
			rainbowWallet({ chains }),
			braveWallet({ chains, shimDisconnect: true }),
			coinbaseWallet({ appName: "Crossbell.io", chains }),
			injectedWallet({ chains, shimDisconnect: true }),
		],
	},
]);

const noopStorage: Storage = {
	getItem: (_) => "",
	setItem: (_, __) => null,
	removeItem: (_) => null,
	length: 0,
	key: (_) => null,
	clear: () => null,
};
const storage = createStorage({
	storage: typeof window !== "undefined" ? window.localStorage : noopStorage,
}); // https://wagmi.sh/docs/client#storage-optional
const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
	storage,
});

const appInfo: RainbowKitProviderProps["appInfo"] = {
	appName: "Crossbell.io",
	learnMoreUrl: "https://learnaboutcryptowallets.example",
	disclaimer: ({ Text, Link }) => (
		<Text>
			By connecting your wallet, you agree to the{" "}
			<Link href="https://termsofservice.xyz">Terms of Service</Link> and
			acknowledge you have read and understand the protocol{" "}
			<Link href="https://disclaimer.xyz">Disclaimer</Link>
		</Text>
	),
};

export function getCurrentAddress() {
	let data = storage.getItem("store") as any;

	if (typeof data === "string") {
		try {
			data = JSON.parse(data);
		} catch {
			return undefined;
		}
	}

	return data?.state?.data?.account;
}

export { chains, wagmiClient, appInfo };
