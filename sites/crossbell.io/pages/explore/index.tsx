import compact from "lodash.compact";
import React from "react";

import { Promotion } from "@/components/promotion";
import { NoteSkeleton } from "@/components/common/Note";
import { useGroupedNotes, GroupedFeedNote } from "@/components/grouped-note";
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

	const flattedData = React.useMemo(
		() => compact(data?.pages.flatMap((page) => page.items) ?? []),
		[data]
	);

	const list = useGroupedNotes(flattedData, (note) => note);

	return (
		<>
			{list?.map((note) => (
				<GroupedFeedNote
					note={note}
					key={`${note.characterId}-${note.noteId}`}
					collapsible
				/>
			))}

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
