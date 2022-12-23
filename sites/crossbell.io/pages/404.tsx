import { getLayout } from "@/components/layouts/AppLayout";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
	return (
		<div className="flex items-center justify-center">
			<img src="/illustrations/404.svg" alt="404" />
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;
