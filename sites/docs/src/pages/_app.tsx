import "../styles/globals.css";

import type { AppProps } from "next/app";
import { WagmiConfig, createClient } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	ConnectKitProvider,
	getDefaultClientConfig,
} from "@crossbell/connect-kit";

const wagmiClient = createClient(
	getDefaultClientConfig({ appName: "Crossbell Dev" })
);
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<WagmiConfig client={wagmiClient}>
				<ConnectKitProvider>
					<Component {...pageProps} />
				</ConnectKitProvider>
			</WagmiConfig>
		</QueryClientProvider>
	);
}
