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
import { ipfsGateway } from "@/utils/ipfs";
import "@/styles/globals.css";
import "uno.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

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
									{getLayout(<Component {...pageProps} />)}
								</IpfsGatewayContext.Provider>
							</NotificationsProvider>
						</ModalsProvider>
					</QueryProvider>
				</WalletProvider>
			</ThemeProvider>
		</>
	);
}
