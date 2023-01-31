import React from "react";
import { LazyMotion } from "framer-motion";
import { IpfsGateway } from "@crossbell/ipfs-gateway";

import { IpfsGatewayContext } from "@crossbell/ipfs-react";
import { InitContractProvider } from "@crossbell/contract";
import { ConnectKitProvider, contractConfig } from "@crossbell/connect-kit";

import { ipfsLinkToHttpLink } from "~/shared/ipfs";
import { openMintNewCharacterModel } from "~/shared/components/new-user-guide";

import { WalletProvider } from "./wallet-provider";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { NotificationsProvider } from "./notifications-provider";
import { ModalsProvider } from "./modals-provider";
import { RouterTransition } from "./router-transition";

const loadFeatures = () =>
	import("~/shared/framer/features").then((res) => res.default);

const ipfsGateway = new IpfsGateway();

export function MainProvider({ children }: React.PropsWithChildren) {
	return (
		<ThemeProvider>
			<WalletProvider>
				<QueryProvider>
					<LazyMotion features={loadFeatures} strict>
						<ModalsProvider>
							<NotificationsProvider>
								<RouterTransition />
								<IpfsGatewayContext.Provider value={ipfsGateway}>
									<InitContractProvider
										{...contractConfig}
										openMintNewCharacterModel={openMintNewCharacterModel}
									>
										<ConnectKitProvider
											withoutNotificationsProvider={true}
											ipfsLinkToHttpLink={ipfsLinkToHttpLink}
										>
											{children}
										</ConnectKitProvider>
									</InitContractProvider>
								</IpfsGatewayContext.Provider>
							</NotificationsProvider>
						</ModalsProvider>
					</LazyMotion>
				</QueryProvider>
			</WalletProvider>
		</ThemeProvider>
	);
}
