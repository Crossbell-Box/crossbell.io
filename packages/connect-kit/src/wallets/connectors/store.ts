import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ConnectorStore = {
	connectedConnectorId: string;
	setConnectedConnectorId: (connectedConnectorId: string) => void;
};

export const connectorStore = create(
	persist<ConnectorStore>(
		(setState) => ({
			connectedConnectorId: "",

			setConnectedConnectorId(connectedConnectorId) {
				setState({ connectedConnectorId });
			},
		}),
		{
			name: "crossbell/connect-kit/connector-store",
		}
	)
);
