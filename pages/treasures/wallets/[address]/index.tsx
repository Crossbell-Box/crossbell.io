import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import MintedNoteCard from "@/components/card/MintedNoteCard";
import { LoadingOverlay } from "@mantine/core";
import { useMintedNotesOfAddress } from "@/utils/apis/indexer";
import Header from "@/components/layouts/Header";
import { useAddressRouterQuery } from "@/utils/url";
import { Fragment } from "react";

const TreasuresList = () => {
	const { address } = useAddressRouterQuery();
	const { isLoading: mintedNotesLoading, data } =
		useMintedNotesOfAddress(address);

	return (
		<div className="grid grid-cols-3 gap-4 relative min-h-300px">
			<LoadingOverlay visible={mintedNotesLoading} />
			{data?.pages?.map((page, i) => (
				<Fragment key={i}>
					{page.list.map((mintedNote) => (
						// TODO: should display the minted note! not note!
						<MintedNoteCard key={mintedNote.noteId} note={mintedNote.note!} />
					))}
				</Fragment>
			))}

			{/* load more */}
			{/* TODO: */}
		</div>
	);
};

const Page: NextPageWithLayout = () => {
	return (
		<div>
			<Header hasBackButton>Treasures</Header>

			<TreasuresList />
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;
