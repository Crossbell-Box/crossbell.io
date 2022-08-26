import { getLayout } from "@/components/layouts/AppLayout";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
	return (
		<div className="flex items-center justify-center">
			<img src="/illustrations/500.svg" alt="500" />
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;
