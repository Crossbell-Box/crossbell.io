import React from "react";

export enum SignInStrategy {
	complete = "complete",
	simple = "simple",
}

export type ConnectKitConfig = {
	signInStrategy: SignInStrategy;
};

export const ConnectKitConfigContext = React.createContext<
	Partial<ConnectKitConfig>
>({});

const defaultConfig: ConnectKitConfig = {
	signInStrategy: SignInStrategy.complete,
};

export function useConnectKitConfig() {
	const context = React.useContext(ConnectKitConfigContext);

	return React.useMemo(() => ({ ...defaultConfig, ...context }), [context]);
}
