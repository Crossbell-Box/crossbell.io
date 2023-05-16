import { configureChains, createConfig } from "wagmi";
import { crossbell } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";

export type GetDefaultClientConfigOptions = {
	appName: string;
};

export function getDefaultClientConfig({
	appName,
}: GetDefaultClientConfigOptions): Parameters<typeof createConfig>[0] {
	const { chains, publicClient, webSocketPublicClient } = configureChains(
		[crossbell],
		[publicProvider()],
		{ pollingInterval: 1_000 }
	);

	const connectors = [
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
		new WalletConnectLegacyConnector({
			chains,
			options: { qrcode: true, chainId: chains[0].id },
		}),
	];

	return {
		autoConnect: true,
		connectors,
		publicClient,
		webSocketPublicClient,
	};
}
