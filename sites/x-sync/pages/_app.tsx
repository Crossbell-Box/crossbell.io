import "uno.css";

import "~/shared/styles/globals.css";
import "~/shared/crossbell.js/setup-indexer";
import "~/shared/crossbell.js/setup-operator-sync";

import { AppProps } from "next/app";
import Head from "next/head";

import { MainProvider, MainProviderProps } from "~/shared/providers";
import { composeCharacterHref, composeNoteHref } from "~/shared/url";

const urlComposer: Required<MainProviderProps>["urlComposer"] = {
	characterUrl: ({ handle }) =>
		`https://crossbell.io/${composeCharacterHref(handle)}`,
	noteUrl: ({ characterId, noteId }) =>
		`https://crossbell.io/${composeNoteHref(characterId, noteId)}`,
};

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>xSync</title>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5b89f7" />
				<meta name="msapplication-TileColor" content="#2b5797" />
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<MainProvider urlComposer={urlComposer}>
				<Component {...pageProps} />
			</MainProvider>
		</>
	);
}
