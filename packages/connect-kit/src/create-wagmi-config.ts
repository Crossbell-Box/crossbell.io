import {
	configureChains,
	createConfig,
	type CreateConfigParameters,
	type PublicClient,
	type WebSocketPublicClient,
} from "wagmi";
import { crossbell } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";

import { CoinbaseWalletConnector } from "./wallets";

export type GetDefaultClientConfigOptions<
	TPublicClient extends PublicClient,
	TWebSocketPublicClient extends WebSocketPublicClient
> = Omit<
	CreateConfigParameters<TPublicClient, TWebSocketPublicClient>,
	"connectors" | "publicClient" | "webSocketPublicClient"
> & {
	appName: string;
};

export function createWagmiConfig<
	TPublicClient extends PublicClient,
	TWebSocketPublicClient extends WebSocketPublicClient
>({
	appName,
	...restConfig
}: GetDefaultClientConfigOptions<TPublicClient, TWebSocketPublicClient>) {
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

	return createConfig({
		autoConnect: true,
		connectors,
		publicClient,
		webSocketPublicClient,
		...restConfig,
	});
}
