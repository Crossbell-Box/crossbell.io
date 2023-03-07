import { useConnect } from "wagmi";
import { showNotification } from "@mantine/notifications";

export function useDefaultWalletConnect() {
	const { connectAsync, connectors } = useConnect();

	return {
		async openDefaultWalletConnect() {
			const connector =
				connectors.find((c) => c.id === "walletConnect") ||
				connectors.find((c) => c.id === "walletConnectLegacy");

			if (connector) {
				try {
					const preferredChainId = connector?.chains[0]?.id;
					const result = await connectAsync({
						chainId: preferredChainId,
						connector: connector,
					});

					if (result.chain.id !== connector.chains[0]?.id) {
						connector.switchChain?.(preferredChainId);
					}
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
