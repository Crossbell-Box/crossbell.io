import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import CharacterManagement from "@/components/ui/CharacterManagement";
import type { NextPageWithLayout } from "@/pages/_app";

const Page: NextPageWithLayout = () => {
	return (
		<div>
			<Header hasBackButton>Mint New Character</Header>

			<CharacterManagement />
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;
