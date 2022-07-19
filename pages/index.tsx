import type {NextPage} from "next";
import React from "react";
import Head from "next/head";
import IndexNav from "@/components/Index/Nav";
import IndexHero from "@/components/Index/Hero";
import IndexTrending from "@/components/Index/Trending";
import IndexFooter from "@/components/Index/Footer";

const Home: NextPage = () => (
  // Use RootLayout directly would cause hydrogen error

  <>
    <Head>
      <title>Crossbell.io</title>
      <meta
        name="description"
        content="Crossbell.io - Own Your Social Activities"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <IndexNav />
      <IndexHero />
      <IndexTrending />
      <IndexFooter />
    </main>
  </>
);

export default Home;
