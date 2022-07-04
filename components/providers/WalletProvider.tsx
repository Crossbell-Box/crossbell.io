import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";
import { appInfo, chains, wagmiClient } from "@/utils/wallet/provider";
import { WagmiConfig } from "wagmi";

export default function WalletProvider({ children }: PropsWithChildren) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} appInfo={appInfo}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
