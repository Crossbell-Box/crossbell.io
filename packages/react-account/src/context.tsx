import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { type WalletClient } from "wagmi";

export type ReactAccountContext = {
	onDisconnect: () => void;
	getWalletClient: () => Promise<WalletClient>;
};

const Context = React.createContext<ReactAccountContext>({
	onDisconnect() {
		throw new Error("onDisconnect not implemented");
	},

	getWalletClient() {
		throw new Error("getWalletClient not implemented");
	},
});

export function ReactAccountProvider(
	props: ReactAccountContext & { children: React.ReactNode }
) {
	const onDisconnect = useRefCallback(props.onDisconnect);
	const getWalletClient = useRefCallback(props.getWalletClient);
	const value = React.useMemo(
		() => ({ onDisconnect, getWalletClient }),
		[onDisconnect, getWalletClient]
	);

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export function useContext() {
	return React.useContext(Context);
}
