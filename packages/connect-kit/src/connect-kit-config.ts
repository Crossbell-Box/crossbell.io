import React from "react";

export type SignInStrategy = "complete" | "simple" | "noCharacterNeeded";

export type ConnectKitConfig = {
	signInStrategy: SignInStrategy;
};

export const ConnectKitConfigContext = React.createContext<
	Partial<ConnectKitConfig>
>({});

const defaultConfig: ConnectKitConfig = {
	signInStrategy: "complete",
};

export function useConnectKitConfig() {
	const context = React.useContext(ConnectKitConfigContext);

	return React.useMemo(() => ({ ...defaultConfig, ...context }), [context]);
}
