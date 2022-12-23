import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import MintedNoteCard from "@/components/card/MintedNoteCard";
import { LoadingOverlay, Divider } from "@mantine/core";
import { useMintedNotesOfAddress } from "@crossbell/indexer";
import Header from "@/components/layouts/Header";
import { useAddressRouterQuery } from "~/shared/url";
import { Fragment } from "react";

const TreasuresList = () => {
	const { address } = useAddressRouterQuery();
	const { isLoading: mintedNotesLoading, data } =
		useMintedNotesOfAddress(address);

	return (
		<div className="grid grid-cols-3 gap-4">
			<LoadingOverlay visible={mintedNotesLoading} />
			{data?.pages?.map((page, i) => (
				<Fragment key={i}>
					{page.list.map((mintedNote) => (
						// TODO: should display the minted note! not note!
						<MintedNoteCard
							key={`${mintedNote.contractAddress}-${mintedNote.tokenId}`}
							note={mintedNote.note!}
						/>
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
			<Header hasBackButton>xShop</Header>

			<div className="relative min-h-300px px-4 py-8">
				<TreasuresList />

				<Divider
					my={44}
					label="Trading is coming soon"
					labelProps={{ color: "dimmed" }}
					labelPosition="center"
				/>
			</div>
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;
