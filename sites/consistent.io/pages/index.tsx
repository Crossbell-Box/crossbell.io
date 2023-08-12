import type { NextPage } from "next";
import React from "react";
import Head from "next/head";

const Home: NextPage = () => (
	// Use RootLayout directly would cause hydrogen error

	<>
		<Head>
			<title>Consistent.io</title>
			<meta
				name="description"
				content="Consistent.io - Own Your Social Activities"
			/>
			<link rel="icon" href="/favicon.ico" />
		</Head>
	</>
);

export default Home;
