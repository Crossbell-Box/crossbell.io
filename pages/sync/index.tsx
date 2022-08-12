import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import type { NextPageWithLayout } from "@/pages/_app";
import OperatorSyncMain from "@/components/Sync/Main";
import Head from "next/head";


const Page: NextPageWithLayout = () => {
	return (
		<div>
      <Head>
        <title>Sync</title>
      </Head>

      <Header>Sync</Header>

			{/*<OperatorSyncCover />*/}
			<OperatorSyncMain />
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;
