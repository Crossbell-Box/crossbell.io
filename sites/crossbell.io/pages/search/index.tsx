import FollowCharacterCard, {
	FollowCharacterSkeleton,
} from "@/components/card/FollowCharacterCard";
import SearchInput from "@/components/common/Input/SearchInput";
import { LoadMore } from "~/shared/components/load-more";
import { Note, NoteSkeleton } from "@/components/common/Note";
import Tabs from "@/components/common/Tabs";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import type { NextPageWithLayout } from "@/pages/_app";
import { useSearchingCharacters, useSearchingNotes } from "@crossbell/indexer";
import { composeSearchHref, useSearchRouterQuery } from "~/shared/url";
import { Title, Text, Container } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import Head from "next/head";

import { Fragment } from "react";

// /search?q=xxx

const Page: NextPageWithLayout = () => {
	const { q } = useSearchRouterQuery();

	return (
		<div>
			<Head>
				<title>{`${q} - Crossbell Search`}</title>
			</Head>

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
					<SearchInput initialValue={q} key={q} />
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

	// check if empty by size
	const { ref: characterListRef, height: characterListHeight } =
		useElementSize();
	const { ref: noteListRef, height: noteListHeight } = useElementSize();

	const resultHeight = characterListHeight + noteListHeight;
	const shouldShow404 = resultHeight === 0;

	return (
		<div className="py-2">
			{shouldShowCharacterList && (
				<div ref={characterListRef}>
					<CharacterList />
				</div>
			)}

			{shouldShowNoteList && (
				<div ref={noteListRef}>
					<NoteList />
				</div>
			)}

			{shouldShow404 && (
				<Container className="flex flex-col items-center justify-center px-10">
					<img src="/illustrations/search-empty.svg" alt="404" />
					<Text weight={600} size="lg">
						No results for &quot;{q}&quot;
					</Text>
					<Text color="dimmed">Try searching for something else?</Text>
				</Container>
			)}
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

	const hasResult = characters?.pages.some((page) => page.count > 0);

	return (
		<div>
			{shouldShowTitle && (isLoading || (!isLoading && hasResult)) && (
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

	const hasResult = notes?.pages.some((page) => page.count > 0);

	return (
		<div>
			{shouldShowTitle && (isLoading || (!isLoading && hasResult)) && (
				<Title order={3} className="m-2">
					Notes
				</Title>
			)}

			{notes?.pages.map((page, i) => (
				<Fragment key={i}>
					{page.list.map((n, i) => (
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
