import { Connector } from "wagmi";

export function checkIsWalletConnectConnector(connector: Connector | null) {
	if (!connector) return false;

	return ["walletConnect", "walletConnectLegacy"].includes(connector.id);
}
