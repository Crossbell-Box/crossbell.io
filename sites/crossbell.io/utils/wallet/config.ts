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
	iconUrl:
		"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyMCAyMCI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzEwMzBfNTQ4NikiPjxwYXRoIGZpbGw9IiNGRkNGNTUiIGQ9Ik0xMi44NDQ0IDE4LjQxODVDMTIuODQ0NCAxOS4yOTIgMTEuNTcwOSAyMCAxMCAyMEM4LjQyOTE1IDIwIDcuMTU0OTEgMTkuMjkyIDcuMTU0OTEgMTguNDE4NUgxMi44NDQ0WiIvPjxwYXRoIGZpbGw9IiNGRkNGNTUiIGQ9Ik03Ljc0MzE3IDcuODI3M0wzLjEyMTA5IDguNzA1MDhDMy4xMjEwOSAzLjg5NzYgNS45NDk4MiAwIDkuNDM5NTUgMEw5LjQxMTAzIDYuMzIyMDJMNy43NDMxNyA3LjgyNzNaIi8+PHBhdGggZmlsbD0iI0ZGQ0Y1NSIgZD0iTTkuMTc4NTcgMTEuMDI1NUw4LjkyOTcxIDEzLjY0MzlMOC41OTE3MiAxNy4yMDI4QzguNTYzOTEgMTcuMjA3MSA4LjUzNTM4IDE3LjIwOTkgOC41MDY4NiAxNy4yMTI4QzcuMzcyMzggMTcuMzMxMiA1Ljc4MDgyIDE2Ljk3MDMgNC4xOTIxMiAxNi4xNTFDMi4yNzE4NCAxNS4xNTkyIDAuODkxMzQ3IDEzLjc3NTEgMC41NjA0ODYgMTIuNjQxM0MxLjA0NTI1IDEyLjYwNDMgMS41MTQ3MiAxMi40NTQ5IDEuOTMxNzEgMTIuMjA0OUMyLjUwNzg2IDExLjg3MTkgMi45MzQyNyAxMS40MjA2IDMuMTMzMjIgMTAuOTg3QzMuMTYxNDcgMTAuOTI1OCAzLjE4NTMgMTAuODYyNyAzLjIwNDUyIDEwLjc5ODFDMy4yNTU1OCAxMC42NDU1IDMuMjY5NzUgMTAuNDgzIDMuMjQ1ODggMTAuMzIzOUw3LjczODE4IDkuNTgzMDFMOS4xNzg1NyAxMS4wMjU1WiIvPjxwYXRoIGZpbGw9IiNGRkNGNTUiIGQ9Ik0xMi4yNTQ3IDcuODI3M0wxNi44NzY4IDguNzA1MDhDMTYuODc4OSAzLjg5NzYgMTQuMDQ5NSAwIDEwLjU2MDUgMEwxMC41ODkgNi4zMjIwMkwxMi4yNTQ3IDcuODI3M1oiLz48cGF0aCBmaWxsPSIjRkZDRjU1IiBkPSJNMTAuODIxNSAxMS4wMjU1TDExLjA3MDMgMTMuNjQzOUwxMS40MDgzIDE3LjIwMjhDMTEuNDM2MSAxNy4yMDcxIDExLjQ2NDcgMTcuMjA5OSAxMS40OTMyIDE3LjIxMjhDMTIuNjI3NyAxNy4zMzEyIDE0LjIxOTIgMTYuOTcwMyAxNS44MDc5IDE2LjE1MUMxNy43Mjk2IDE1LjE1OTIgMTkuMTA4NyAxMy43NzUxIDE5LjQzOTYgMTIuNjQxM0MxOC45NTQ4IDEyLjYwNDMgMTguNDg1MyAxMi40NTQ5IDE4LjA2ODMgMTIuMjA0OUMxNy40OTIyIDExLjg3MTkgMTcuMDY1OCAxMS40MjA2IDE2Ljg2NjggMTAuOTg3QzE2LjgzODYgMTAuOTI1OCAxNi44MTQ3IDEwLjg2MjcgMTYuNzk1NSAxMC43OTgxQzE2Ljc0NDUgMTAuNjQ1NSAxNi43MzAzIDEwLjQ4MyAxNi43NTQyIDEwLjMyMzlMMTIuMjYxOSA5LjU4MzAxTDEwLjgyMTUgMTEuMDI1NVoiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwMF8xMDMwXzU0ODYiPjxyZWN0IHdpZHRoPSIxOC44NzkiIGhlaWdodD0iMjAiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNTYwNDg2KSIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==",
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
