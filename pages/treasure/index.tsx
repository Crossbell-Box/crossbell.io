import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import MintedNoteCard from "@/components/card/MintedNoteCard";
import { LoadingOverlay } from "@mantine/core";
import { useMintedNotesOfAddress } from "@/utils/apis/indexer";
import { useAccount } from "wagmi";
import Header from "@/components/layouts/Header";

const TreasuresList = () => {
	const { address } = useAccount();
	const { isLoading: mintedNotesLoading, data: mintedNotesArray } =
		useMintedNotesOfAddress(address);

	return (
		<>
			<div className="grid grid-cols-3 gap-4 relative min-h-300px">
				<LoadingOverlay visible={mintedNotesLoading} />
				{mintedNotesArray?.list.map((mintedNote) => (
					// TODO:
					<MintedNoteCard key={mintedNote.noteId} note={mintedNote.note!} />
				))}
			</div>
		</>
	);
};

const Page: NextPageWithLayout = () => {
	return (
		<div>
			<Header>Treasures</Header>
			<TreasuresList />
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;
