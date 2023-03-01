import React, { PropsWithChildren } from "react";
import { WagmiConfig } from "wagmi";
import { getDefaultClient } from "@crossbell/connect-kit";

const client = getDefaultClient({ appName: "crossbell.io" });

export function WalletProvider({ children }: PropsWithChildren) {
	return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
