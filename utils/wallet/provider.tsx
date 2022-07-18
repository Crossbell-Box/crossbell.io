import React from "react";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { type Chain, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { RainbowKitProviderProps } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider";
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
	[jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
	appName: "Crossbell.io",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
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

export { chains, wagmiClient, appInfo };
