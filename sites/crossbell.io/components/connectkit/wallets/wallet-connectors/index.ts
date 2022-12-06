import { chains } from "@/components/connectkit/config";

import { metaMaskWallet } from "./meta-mask-wallet";
import { coinbaseWallet } from "./coinbase-wallet";

export const walletConnectors = [
	metaMaskWallet({ chains }),
	coinbaseWallet({ chains, appName: "Crossbell.io" }),
];
