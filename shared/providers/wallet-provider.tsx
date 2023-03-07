import React, { PropsWithChildren } from "react";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultClientConfig } from "@crossbell/connect-kit";

const client = createClient(
	getDefaultClientConfig({
		appName: "crossbell.io",
		walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
	})
);

export function WalletProvider({ children }: PropsWithChildren) {
	return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
