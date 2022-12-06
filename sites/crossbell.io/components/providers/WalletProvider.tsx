import { PropsWithChildren } from "react";
import { WagmiConfig } from "wagmi";

import { wagmiClient } from "@/utils/wallet/provider";

export default function WalletProvider({ children }: PropsWithChildren) {
	return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
}
