import React from "react";
import {
	getDefaultWallets,
	connectorsForWallets,
	wallet,
} from "@rainbow-me/rainbowkit";
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

// const { connectors } = getDefaultWallets({
// 	appName: "Crossbell.io",
// 	chains,
// });

const connectors = connectorsForWallets([
	{
		groupName: "Popular",
		wallets: [
			wallet.metaMask({ chains, shimDisconnect: true }),
			wallet.walletConnect({ chains }),
			wallet.brave({ chains, shimDisconnect: true }),
			wallet.coinbase({ appName: "Crossbell.io", chains }),
			wallet.injected({ chains, shimDisconnect: true }),
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

function isMetaMask(ethereum: NonNullable<typeof window["ethereum"]>) {
	// Logic borrowed from wagmi's MetaMaskConnector
	// https://github.com/tmm/wagmi/blob/main/packages/core/src/connectors/metaMask.ts
	const isMetaMask = Boolean(ethereum.isMetaMask);

	if (!isMetaMask) {
		return false;
	}

	// Brave tries to make itself look like MetaMask
	// Could also try RPC `web3_clientVersion` if following is unreliable
	if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) {
		return false;
	}

	if (ethereum.isTokenary) {
		return false;
	}

	return true;
}
