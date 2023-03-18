import { Promotion } from "@/components/promotion";
import { LoadMore } from "~/shared/components/load-more";
import { NoteSkeleton } from "@/components/common/Note";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import type { NextPageWithLayout } from "@/pages/_app";
import { useNotes } from "@crossbell/indexer";
import { FeedTabs } from "../feed";
import { useGroupedNotes, GroupedFeedNote } from "@/components/grouped-note";

const Page: NextPageWithLayout = () => {
	return (
		<div>
			<Header>Latest</Header>
			<Promotion />
			<FeedTabs />
			<Latest />
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;

function Latest() {
	return (
		<div>
			<NoteList />
		</div>
	);
}

function NoteList() {
	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useNotes();

	const list = useGroupedNotes(
		data?.pages.flatMap((page) => page.list) ?? [],
		(note) => note
	);

	return (
		<>
			{/* feeds */}
			{list.map((note) => (
				<GroupedFeedNote
					note={note}
					key={`${note.characterId}-${note.noteId}`}
					collapsible
				/>
			))}
			{isLoading &&
				Array(10)
					.fill(0)
					.map((_, i) => <NoteSkeleton key={i} />)}

			{/* load more */}
			<LoadMore
				onLoadMore={() => fetchNextPage()}
				hasNextPage={Boolean(hasNextPage)}
				isLoading={isFetchingNextPage}
			>
				{Array(3)
					.fill(0)
					.map((_, i) => (
						<NoteSkeleton key={i} />
					))}
			</LoadMore>
		</>
	);
}
