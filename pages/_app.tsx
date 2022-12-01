import "uno.css";
import "@/styles/globals.css";

import { IpfsGatewayContext } from "@crossbell/ipfs-react";
import { ReactElement, ReactNode } from "react";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { NextPage } from "next/types";
import Head from "next/head";

import WalletProvider from "@/components/providers/WalletProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import NotificationsProvider from "@/components/providers/NotificationsProvider";
import ModalsProvider from "@/components/providers/ModalsProvider";
import { RouterTransition } from "@/components/providers/RouterTransition";
import {
	ConnectKitProvider,
	useAccountState,
	useConnectModal,
	useUpgradeAccountModal,
} from "@/components/connectkit";
import { ipfsGateway } from "@/utils/ipfs";
import { InitContractProvider } from "@/utils/crossbell.js";
import { useRefCallback } from "@/utils/hooks/use-ref-callback";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

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
						<ModalsProvider>
							<NotificationsProvider>
								<RouterTransition />
								<IpfsGatewayContext.Provider value={ipfsGateway}>
									<ConnectKitProvider>
										<InitContractProvider
											openConnectModal={
												isEmailConnected
													? upgradeAccountModal.show
													: connectModal.show
											}
											getCurrentCharacterId={getCurrentCharacterId}
										>
											{getLayout(<Component {...pageProps} />)}
										</InitContractProvider>
									</ConnectKitProvider>
								</IpfsGatewayContext.Provider>
							</NotificationsProvider>
						</ModalsProvider>
					</QueryProvider>
				</WalletProvider>
			</ThemeProvider>
		</>
	);
}
