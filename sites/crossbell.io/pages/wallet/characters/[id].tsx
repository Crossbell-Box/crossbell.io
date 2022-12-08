import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import CharacterManagement from "@/components/ui/CharacterManagement";
import type { NextPageWithLayout } from "@/pages/_app";
import { useEditCharacterRouterQuery } from "~/shared/url";

const Page: NextPageWithLayout = () => {
	const { characterId } = useEditCharacterRouterQuery();

	// TODO: auth check

	return (
		<div>
			<Header hasBackButton>Edit Character</Header>

			{/* profile */}
			<CharacterManagement characterId={characterId} />
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;
