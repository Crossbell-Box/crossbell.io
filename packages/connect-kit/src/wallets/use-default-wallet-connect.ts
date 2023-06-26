import { useConnect } from "wagmi";
import { showNotification } from "@mantine/notifications";

import { checkIsWalletConnectConnector } from "../utils";
import { connectorStore } from "./connectors/store";

export function useDefaultWalletConnect() {
	const { connectAsync, connectors } = useConnect();

	return {
		async openDefaultWalletConnect() {
			const connector = connectors.find(checkIsWalletConnectConnector);

			if (connector) {
				try {
					const preferredChainId = connector?.chains[0]?.id;
					const result = await connectAsync({
						chainId: preferredChainId,
						connector: connector,
					});

					connectorStore.getState().setConnectedConnectorId(connector.id);

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
