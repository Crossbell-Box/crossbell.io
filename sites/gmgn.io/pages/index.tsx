import type { NextPage } from "next";
import React from "react";
import Head from "next/head";

const Home: NextPage = () => (
	// Use RootLayout directly would cause hydrogen error

	<>
		<Head>
			<title>GMGN</title>
			<meta name="description" content="GMGN - Have A Nice Day" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	</>
);

export default Home;
