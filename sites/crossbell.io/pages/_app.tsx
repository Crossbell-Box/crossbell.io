import "uno.css";

import "~/shared/styles/globals.css";
import "~/shared/crossbell.js/setup-indexer";
import "~/shared/crossbell.js/setup-operator-sync";

import { ReactElement, ReactNode } from "react";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { NextPage } from "next/types";
import Head from "next/head";

import { MainProvider } from "~/shared/providers";

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

			<MainProvider>{getLayout(<Component {...pageProps} />)}</MainProvider>
		</>
	);
}
