import { Promotion } from "@/components/promotion/x-sync";
import { Note, NoteSkeleton } from "@/components/common/Note";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import type { NextPageWithLayout } from "@/pages/_app";
import { useTrending } from "~/shared/apis/trending";
import { LoadMore } from "~/shared/components/load-more";

import { FeedTabs } from "../feed";

const Page: NextPageWithLayout = () => {
	return (
		<div>
			<Header>Explore</Header>
			<Promotion />
			<FeedTabs />
			<Explore />
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;

function Explore() {
	return (
		<div>
			<NoteList />
		</div>
	);
}

function NoteList() {
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useTrending("note");

	return (
		<>
			{data?.pages.flatMap(
				({ items }) =>
					items?.map((note) => (
						<Note
							note={note}
							key={`${note.characterId}-${note.noteId}`}
							collapsible
						/>
					)) ?? []
			)}

			<LoadMore
				onLoadMore={() => fetchNextPage()}
				hasNextPage={Boolean(hasNextPage)}
				isLoading={isFetchingNextPage}
			>
				{Array(10)
					.fill(0)
					.map((_, i) => (
						<NoteSkeleton key={i} />
					))}
			</LoadMore>
		</>
	);
}
