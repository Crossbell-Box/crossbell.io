import React, { PropsWithChildren } from "react";
import { WagmiConfig } from "wagmi";

import { wagmiClient } from "~/shared/wallet/provider";

export function WalletProvider({ children }: PropsWithChildren) {
	return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
}
