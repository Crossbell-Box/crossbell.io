import FollowCharacterCard, {
	FollowCharacterSkeleton,
} from "@/components/card/FollowCharacterCard";
import SearchInput from "@/components/common/Input/SearchInput";
import LoadMore from "@/components/common/LoadMore";
import { Note, NoteSkeleton } from "@/components/common/Note";
import Tabs from "@/components/common/Tabs";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import type { NextPageWithLayout } from "@/pages/_app";
import {
	useSearchingCharacters,
	useSearchingNotes,
} from "@/utils/apis/indexer";
import { composeSearchHref, useSearchRouterQuery } from "@/utils/url";
import { Title } from "@mantine/core";

import { Fragment } from "react";

// /search?q=xxx

const Page: NextPageWithLayout = () => {
	const { q } = useSearchRouterQuery();

	return (
		<div>
			<Header
				hasBackButton
				renderBottom={() => (
					<div>
						<Tabs
							tabs={[
								{ label: "All", route: composeSearchHref(q, "all") },
								{
									label: "Characters",
									route: composeSearchHref(q, "characters"),
								},
								// {
								// 	label: "Treasures",
								// 	route: composeSearchHref(q, "treasures"),
								// },
								{ label: "Notes", route: composeSearchHref(q, "notes") },
							]}
						/>
					</div>
				)}
			>
				<div className="py-5 w-full">
					<SearchInput defaultValue={q} />
				</div>
			</Header>

			{/* result */}

			<SearchResult />
		</div>
	);
};

function SearchResult() {
	const { q, type: searchType } = useSearchRouterQuery();

	const shouldShowCharacterList =
		searchType === "all" || searchType === "characters";
	const shouldShowNoteList = searchType === "all" || searchType === "notes";

	return (
		<div className="py-2">
			{shouldShowCharacterList && <CharacterList />}

			{shouldShowNoteList && <NoteList />}
		</div>
	);
}

function CharacterList() {
	const { q, type: searchType } = useSearchRouterQuery();

	const shouldShowTitle = searchType === "all";
	const shouldLoadMore = searchType === "characters";

	const {
		data: characters,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		isLoading,
	} = useSearchingCharacters(
		q,
		{ limit: shouldLoadMore ? 20 : 3 },
		{
			enabled:
				Boolean(q) && (searchType === "all" || searchType === "characters"),
		}
	);

	return (
		<div>
			{shouldShowTitle && (
				<Title order={3} className="m-2">
					Characters
				</Title>
			)}
			{characters?.pages.map((page, i) => (
				<Fragment key={i}>
					{page.list.map((c, i) => (
						<FollowCharacterCard key={c.characterId} character={c} />
					))}
				</Fragment>
			))}

			{isLoading &&
				Array(3)
					.fill(0)
					.map((_, i) => <FollowCharacterSkeleton key={i} />)}

			{/* load more */}
			{shouldLoadMore && (
				<LoadMore
					onLoadMore={() => fetchNextPage()}
					hasNextPage={Boolean(hasNextPage)}
					isLoading={isFetchingNextPage}
				>
					{Array(3)
						.fill(0)
						.map((_, i) => (
							<FollowCharacterSkeleton key={i} />
						))}
				</LoadMore>
			)}
		</div>
	);
}

function NoteList() {
	const { q, type: searchType } = useSearchRouterQuery();

	const {
		data: notes,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		isLoading,
	} = useSearchingNotes(
		q,
		{},
		{
			enabled: Boolean(q) && (searchType === "all" || searchType === "notes"),
		}
	);

	const shouldShowTitle = searchType === "all";

	return (
		<div>
			{shouldShowTitle && (
				<Title order={3} className="m-2">
					Notes
				</Title>
			)}

			{notes?.pages.map((page, i) => (
				<Fragment key={i}>
					{page.list.slice(0, 3).map((n, i) => (
						<Note key={`${n.characterId}-${n.noteId}`} note={n} collapsible />
					))}
				</Fragment>
			))}

			{isLoading &&
				Array(5)
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
		</div>
	);
}

Page.getLayout = getLayout;

export default Page;
