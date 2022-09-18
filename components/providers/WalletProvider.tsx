import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";
import { appInfo, chains, wagmiClient } from "@/utils/wallet/provider";
import { WagmiConfig } from "wagmi";
import { useMantineTheme } from "@mantine/core";
import { usePrimaryShade } from "./ThemeProvider";

export default function WalletProvider({ children }: PropsWithChildren) {
	const mantineTheme = useMantineTheme();
	const primaryShade = usePrimaryShade();

	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				chains={chains}
				appInfo={appInfo}
				theme={lightTheme({
					accentColor: mantineTheme.colors.brand[primaryShade],
					accentColorForeground: "black",
					borderRadius: "small",
				})}
			>
				{children}
			</RainbowKitProvider>
		</WagmiConfig>
	);
}
