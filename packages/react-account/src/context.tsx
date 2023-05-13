import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import type { Address, Hex } from "viem";

export type BaseSigner = {
	signMessage: (msg: string) => Promise<Hex | undefined>;
	getAddress: () => Promise<Address | undefined>;
};

export type ReactAccountContext = {
	onDisconnect: () => void;
	getSigner: () => Promise<BaseSigner | undefined>;
};

const Context = React.createContext<ReactAccountContext>({
	onDisconnect() {
		throw new Error("onDisconnect not implemented");
	},

	getSigner() {
		throw new Error("getSigner not implemented");
	},
});

export function ReactAccountProvider(
	props: ReactAccountContext & { children: React.ReactNode }
) {
	const onDisconnect = useRefCallback(props.onDisconnect);
	const getSigner = useRefCallback(props.getSigner);
	const value = React.useMemo(
		() => ({ onDisconnect, getSigner }),
		[onDisconnect, getSigner]
	);

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export function useContext() {
	return React.useContext(Context);
}
