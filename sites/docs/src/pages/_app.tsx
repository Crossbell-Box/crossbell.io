import "../styles/globals.css";

import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";

import { ConnectKitProvider, getDefaultClient } from "@crossbell/connect-kit";

const client = getDefaultClient({ appName: "Crossbell Dev" });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider>
				<Component {...pageProps} />
			</ConnectKitProvider>
		</WagmiConfig>
	);
}
