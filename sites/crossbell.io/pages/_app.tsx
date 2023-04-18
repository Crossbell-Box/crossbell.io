import "uno.css";

import "~/shared/styles/globals.css";
import "~/shared/crossbell.js/setup-indexer";
import "~/shared/crossbell.js/setup-operator-sync";

import React, { ReactElement, ReactNode } from "react";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { NextPage } from "next/types";
import Head from "next/head";

import { NotificationModal } from "@crossbell/notification";

import { ShowSentryPrivacyModalIfNeed } from "@/components/biz/sentry-privacy";
import { MainProvider, MainProviderProps } from "~/shared/providers";
import { composeCharacterHref, composeNoteHref } from "~/shared/url";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
	P,
	IP
> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const urlComposer: Required<MainProviderProps>["urlComposer"] = {
	characterUrl: ({ handle }) => composeCharacterHref(handle),
	noteUrl: ({ characterId, noteId }) => composeNoteHref(characterId, noteId),
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

			<MainProvider urlComposer={urlComposer}>
				<NotificationModal />
				<ShowSentryPrivacyModalIfNeed />
				{getLayout(<Component {...pageProps} />)}
			</MainProvider>
		</>
	);
}
