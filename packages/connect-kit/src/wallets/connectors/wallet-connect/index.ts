import { WalletConnectConnector as BaseConnector } from "wagmi/connectors/walletConnect";

import { connectorStore } from "../store";

export class WalletConnectConnector extends BaseConnector {
	isAuthorized = async (): Promise<boolean> => {
		if (connectorStore.getState().connectedConnectorId !== this.id) {
			return false;
		}

		return super.isAuthorized();
	};
}
