import React, { PropsWithChildren } from "react";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultClientConfig } from "@crossbell/connect-kit";

const client = createClient(
	getDefaultClientConfig({ appName: "crossbell.io" })
);

export function WalletProvider({ children }: PropsWithChildren) {
	return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
