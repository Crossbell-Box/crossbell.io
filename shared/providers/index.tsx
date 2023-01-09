import React from "react";
import { LazyMotion } from "framer-motion";

import { IpfsGatewayContext } from "@crossbell/ipfs-react";
import { InitContractProvider } from "@crossbell/contract";
import { ipfsGateway, ipfsLinkToHttpLink } from "@crossbell/util-ipfs";
import { useRefCallback } from "@crossbell/util-hooks";
import {
	ConnectKitProvider,
	useAccountState,
	useConnectModal,
	useUpgradeAccountModal,
} from "@crossbell/connect-kit";

import {
	openFaucetHintModel,
	openMintNewCharacterModel,
} from "~/shared/components/new-user-guide";

import { WalletProvider } from "./wallet-provider";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { NotificationsProvider } from "./notifications-provider";
import { ModalsProvider } from "./modals-provider";
import { RouterTransition } from "./router-transition";

const loadFeatures = () =>
	import("~/shared/framer/features").then((res) => res.default);

export function MainProvider({ children }: React.PropsWithChildren) {
	const connectModal = useConnectModal();
	const upgradeAccountModal = useUpgradeAccountModal();
	const [isEmailConnected, characterId] = useAccountState((s) => [
		!!s.email,
		s.computed.account?.characterId,
	]);
	const getCurrentCharacterId = useRefCallback(() => characterId ?? null);

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
										openFaucetHintModel={openFaucetHintModel}
										openMintNewCharacterModel={openMintNewCharacterModel}
										openConnectModal={
											isEmailConnected
												? upgradeAccountModal.show
												: connectModal.show
										}
										getCurrentCharacterId={getCurrentCharacterId}
									>
										<ConnectKitProvider ipfsLinkToHttpLink={ipfsLinkToHttpLink}>
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
