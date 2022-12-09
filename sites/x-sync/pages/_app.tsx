import "uno.css";

import "~/shared/styles/globals.css";
import "~/shared/crossbell.js/setup-indexer";
import "~/shared/crossbell.js/setup-operator-sync";

import { AppProps } from "next/app";
import Head from "next/head";

import { MainProvider } from "~/shared/providers";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>xSync</title>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<MainProvider>
				<Component {...pageProps} />
			</MainProvider>
		</>
	);
}
