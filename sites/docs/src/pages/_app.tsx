import "../styles/globals.css";

import type { AppProps } from "next/app";
import { WagmiConfig, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import {
	ConnectKitProvider,
	getDefaultClientConfig,
	XSettingsConfig,
} from "@crossbell/connect-kit";
import { NotificationModal } from "@crossbell/notification";

const wagmiClient = createConfig(
	getDefaultClientConfig({ appName: "Crossbell Dev" })
);
const queryClient = new QueryClient();
const dsn =
	"https://8e72f50cf3a04612ac5c544dabc3bcab@o4504811532517376.ingest.sentry.io/4504840965259264";

const xSettings: Partial<XSettingsConfig> = {
	appName: "Crossbell Dev",

	sentry: {
		dsn,
		setup() {
			Sentry.init({
				dsn,
				integrations: [new BrowserTracing()],
				tracesSampleRate: 1,
			});
		},
		close() {
			Sentry.close();
		},
	},
};

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<WagmiConfig config={wagmiClient}>
				<ConnectKitProvider
					xSettings={xSettings}
					ignoreWalletDisconnectEvent={true}
				>
					<NotificationModal />
					<Component {...pageProps} />
				</ConnectKitProvider>
			</WagmiConfig>
		</QueryClientProvider>
	);
}
