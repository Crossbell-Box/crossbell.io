import { useConnect } from "wagmi";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { showNotification } from "@mantine/notifications";

export function useDefaultWalletConnect() {
	const { connectAsync, connectors } = useConnect();

	return {
		async openDefaultWalletConnect() {
			const connector = connectors.find((c) => c.id === "walletConnect");

			if (connector) {
				try {
					await connectAsync({
						chainId: connector.chains[0].id,
						connector: new WalletConnectConnector({
							chains: connector.chains,
							options: { ...connector.options, qrcode: true },
						}),
					});
				} catch (err) {
					showNotification({
						title: "Error while connecting to WalletConnect",
						message: err instanceof Error ? err.message : `${err}`,
						color: "red",
					});
				}
			} else {
				showNotification({
					title: "Error while connecting to WalletConnect",
					message: "No WalletConnect connector available",
					color: "red",
				});
			}
		},
	};
}
