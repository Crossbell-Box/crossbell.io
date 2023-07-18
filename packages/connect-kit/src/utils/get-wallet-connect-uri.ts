import type { WalletConnectConnector } from "wagmi/connectors/walletConnect";

export async function getWalletConnectUri(connector: WalletConnectConnector) {
	const provider = await connector.getProvider();

	return new Promise<string>((resolve) =>
		provider.once("display_uri", resolve),
	);
}
