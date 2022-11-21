import React from "react";

export type ConnectModalContextType = {
	refreshSize: () => void;
};

export const ConnectModalContext = React.createContext<ConnectModalContextType>(
	{
		refreshSize() {},
	}
);

export function useConnectModalContext() {
	return React.useContext(ConnectModalContext);
}
