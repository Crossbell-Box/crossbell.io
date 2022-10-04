import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import OperatorSyncPage from "@/components/pages/sync";
import type { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";

const Page: NextPageWithLayout = () => {
	return (
		<div>
			<Head>
				<title>xSync</title>
			</Head>

			<Header>xSync</Header>

			<div className="my-5">
				<OperatorSyncPage />
			</div>
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;
