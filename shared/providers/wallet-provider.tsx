import React, { PropsWithChildren } from "react";
import { WagmiConfig } from "wagmi";
import { createWagmiConfig } from "@crossbell/connect-kit";

const wagmiConfig = createWagmiConfig({
	appName: "crossbell.io",
	walletConnectV2ProjectId: "a5258bad950102b8923e13a1d4e0682a",
});

export function WalletProvider({ children }: PropsWithChildren) {
	return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
