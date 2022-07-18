import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import type { NextPageWithLayout } from "@/pages/_app";

const Page: NextPageWithLayout = () => {
	return (
		<div>
			<Header>Shop</Header>
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;
