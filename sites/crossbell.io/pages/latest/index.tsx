import { Promotion } from "@/components/pages/sync/promotion";
import LoadMore from "@/components/common/LoadMore";
import { Note, NoteSkeleton } from "@/components/common/Note";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import type { NextPageWithLayout } from "@/pages/_app";
import { useNotes } from "@/utils/apis/indexer";
import { Fragment } from "react";
import { FeedTabs } from "../feed";

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

	return (
		<>
			{/* feeds */}
			{data?.pages.map((page, i) => (
				<Fragment key={i}>
					{page.list.map((note, i) => (
						<Note
							note={note}
							key={`${note.characterId}-${note.noteId}`}
							collapsible
						/>
					))}
				</Fragment>
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
