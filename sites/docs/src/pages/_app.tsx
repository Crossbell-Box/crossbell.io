import "../styles/globals.css";
import "@crossbell/connect-kit/colors.css";

import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import {
	ConnectKitProvider,
	createWagmiConfig,
	XSettingsConfig,
} from "@crossbell/connect-kit";
import { NotificationModal } from "@crossbell/notification";

const wagmiConfig = createWagmiConfig({ appName: "Crossbell Dev" });
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
			<WagmiConfig config={wagmiConfig}>
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
