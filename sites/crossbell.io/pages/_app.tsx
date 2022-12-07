import "uno.css";
import "@/styles/globals.css";

import "@/utils/crossbell.js/setup-indexer";
import "@/utils/crossbell.js/setup-operator-sync";

import { IpfsGatewayContext } from "@crossbell/ipfs-react";
import { InitContractProvider } from "@crossbell/contract";
import { ReactElement, ReactNode } from "react";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { NextPage } from "next/types";
import Head from "next/head";
import { LazyMotion } from "framer-motion";

import WalletProvider from "@/components/providers/WalletProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import NotificationsProvider from "@/components/providers/NotificationsProvider";
import ModalsProvider from "@/components/providers/ModalsProvider";
import { RouterTransition } from "@/components/providers/RouterTransition";
import {
	openFaucetHintModel,
	openMintNewCharacterModel,
} from "@/components/common/NewUserGuide";
import {
	ConnectKitProvider,
	useAccountState,
	useConnectModal,
	useUpgradeAccountModal,
} from "@/components/connectkit";
import { ipfsGateway } from "@crossbell/util-ipfs";
import { useRefCallback } from "@crossbell/util-hooks";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const loadFeatures = () =>
	import("@/utils/framer/features").then((res) => res.default);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);
	const connectModal = useConnectModal();
	const upgradeAccountModal = useUpgradeAccountModal();
	const [isEmailConnected, characterId] = useAccountState((s) => [
		!!s.email,
		s.computed.account?.characterId,
	]);
	const getCurrentCharacterId = useRefCallback(() => characterId ?? null);

	return (
		<>
			<Head>
				<title>Crossbell.io</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>

			<DefaultSeo
				title="Crossbell.io"
				description="Own Your Social Activities!"
				openGraph={{
					type: "website",
					locale: "en_US",
					url: "https://crossbell.io",
					site_name: "Crossbell",
				}}
				twitter={{
					site: "@_Crossbell",
					cardType: "summary_large_image",
				}}
			/>

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
											<ConnectKitProvider>
												{getLayout(<Component {...pageProps} />)}
											</ConnectKitProvider>
										</InitContractProvider>
									</IpfsGatewayContext.Provider>
								</NotificationsProvider>
							</ModalsProvider>
						</LazyMotion>
					</QueryProvider>
				</WalletProvider>
			</ThemeProvider>
		</>
	);
}
