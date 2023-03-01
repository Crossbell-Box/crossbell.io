import React from "react";
import { LazyMotion } from "framer-motion";
import { IpfsGateway } from "@crossbell/ipfs-gateway";

import { IpfsGatewayContext } from "@crossbell/ipfs-react";
import {
	ConnectKitProvider,
	ConnectKitProviderProps,
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
