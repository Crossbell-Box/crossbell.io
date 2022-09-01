import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import Main from "@/components/pages/Sync/Main";
import type { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";

const Page: NextPageWithLayout = () => {
	return (
		<div>
			<Head>
				<title>Sync</title>
			</Head>

			<Header>Sync</Header>

			<div className="my-5">
				<Main />
			</div>
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;
