import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";

export type BaseSigner = {
	signMessage: (msg: string) => Promise<string>;
	getAddress: () => Promise<string>;
};

export type ReactAccountContext = {
	onDisconnect: () => void;
	getSinger: () => Promise<BaseSigner>;
};

const Context = React.createContext<ReactAccountContext>({
	onDisconnect() {
		throw new Error("onDisconnect not implemented");
	},

	getSinger() {
		throw new Error("getSinger not implemented");
	},
});

export function ReactAccountProvider(
	props: ReactAccountContext & { children: React.ReactNode }
) {
	const onDisconnect = useRefCallback(props.onDisconnect);
	const getSinger = useRefCallback(props.getSinger);
	const value = React.useMemo(
		() => ({ onDisconnect, getSinger }),
		[onDisconnect, getSinger]
	);

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export function useContext() {
	return React.useContext(Context);
}
