import React from "react";
import { LazyMotion } from "framer-motion";
import { IpfsGateway } from "@crossbell/ipfs-gateway";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import { IpfsGatewayContext } from "@crossbell/ipfs-react";
import {
	ConnectKitProvider,
	ConnectKitProviderProps,
	XSettingsConfig,
} from "@crossbell/connect-kit";

import { ipfsLinkToHttpLink } from "~/shared/ipfs";

import { WalletProvider } from "./wallet-provider";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { NotificationsProvider } from "./notifications-provider";
import { ModalsProvider } from "./modals-provider";
import { RouterTransition } from "./router-transition";

const loadFeatures = () =>
	import("~/shared/framer/features").then((res) => res.default);

const ipfsGateway = new IpfsGateway();

export type MainProviderProps = {
	children: React.ReactNode;
	urlComposer?: ConnectKitProviderProps["urlComposer"];
};

const dsn =
	"https://ea0d51fe7a3c4b00b1792740194fb2b9@o4504811532517376.ingest.sentry.io/4504811637964800";

const xSettings: Partial<XSettingsConfig> = {
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

export function MainProvider({ children, urlComposer }: MainProviderProps) {
	return (
		<ThemeProvider>
			<WalletProvider>
				<QueryProvider>
					<LazyMotion features={loadFeatures} strict>
						<ModalsProvider>
							<NotificationsProvider>
								<RouterTransition />
								<IpfsGatewayContext.Provider value={ipfsGateway}>
									<ConnectKitProvider
										withoutNotificationsProvider={true}
										ipfsLinkToHttpLink={ipfsLinkToHttpLink}
										urlComposer={urlComposer}
										xSettings={xSettings}
									>
										{children}
									</ConnectKitProvider>
								</IpfsGatewayContext.Provider>
							</NotificationsProvider>
						</ModalsProvider>
					</LazyMotion>
				</QueryProvider>
			</WalletProvider>
		</ThemeProvider>
	);
}
