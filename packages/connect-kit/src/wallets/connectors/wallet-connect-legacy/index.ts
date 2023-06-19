import { WalletConnectLegacyConnector as BaseConnector } from "wagmi/connectors/walletConnectLegacy";

import { connectorStore } from "../store";

export class WalletConnectLegacyConnector extends BaseConnector {
	isAuthorized = async (): Promise<boolean> => {
		if (connectorStore.getState().connectedConnectorId !== this.id) {
			return false;
		}

		return super.isAuthorized();
	};
}
