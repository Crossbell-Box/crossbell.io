import "uno.css";
import "@/styles/globals.css";

import "~/shared/crossbell.js/setup-indexer";
import "~/shared/crossbell.js/setup-operator-sync";

import { IpfsGatewayContext } from "@crossbell/ipfs-react";
import { InitContractProvider } from "@crossbell/contract";
import { ReactElement, ReactNode } from "react";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { NextPage } from "next/types";
import Head from "next/head";
import { LazyMotion } from "framer-motion";

import WalletProvider from "~/shared/providers/WalletProvider";
import ThemeProvider from "~/shared/providers/ThemeProvider";
import QueryProvider from "~/shared/providers/QueryProvider";
import NotificationsProvider from "~/shared/providers/NotificationsProvider";
import ModalsProvider from "~/shared/providers/ModalsProvider";
import { RouterTransition } from "~/shared/providers/RouterTransition";
import {
	openFaucetHintModel,
	openMintNewCharacterModel,
} from "~/shared/components/new-user-guide";
import {
	ConnectKitProvider,
	useAccountState,
	useConnectModal,
	useUpgradeAccountModal,
} from "@crossbell/connect-kit";
import { ipfsGateway } from "@crossbell/util-ipfs";
import { useRefCallback } from "@crossbell/util-hooks";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const loadFeatures = () =>
	import("~/shared/framer/features").then((res) => res.default);

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
