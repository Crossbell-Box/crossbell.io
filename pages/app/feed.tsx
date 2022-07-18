import { Feed, FeedSkeleton } from "@/components/common/Feed";
import LoadMore from "@/components/common/LoadMore";
import Tabs from "@/components/common/Tabs";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import type { NextPageWithLayout } from "@/pages/_app";
import {
	useCharacter,
	useCurrentCharacter,
	useCurrentCharacterId,
	useFeedsOfCharacter,
	useFollowingFeedsOfCharacter,
} from "@/utils/apis/indexer";
import { Fragment } from "react";

const Page: NextPageWithLayout = () => {
	return (
		<div>
			<Header>Feed</Header>

			<Tabs
				tabs={[{ label: "Home", content: <Home /> }, { label: "Explore" }]}
				defaultValue="Home"
			/>
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;

function Home() {
	return (
		<div>
			<FeedList />
		</div>
	);
}

function FeedList() {
	const { data: character } = useCurrentCharacter();
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
		useFollowingFeedsOfCharacter(character?.characterId);

	return (
		<>
			{/* feeds */}
			{data?.pages.map((page, i) => (
				<Fragment key={i}>
					{page.list.map((feed, i) => (
						<Feed
							feed={feed}
							key={`${feed.transactionHash}-${feed.logIndex}`}
						/>
					))}
				</Fragment>
			))}
			{isLoading &&
				Array(10)
					.fill(0)
					.map((_, i) => <FeedSkeleton key={i} />)}

			{/* load more */}
			<LoadMore
				onLoadMore={() => fetchNextPage()}
				hasNextPage={Boolean(hasNextPage)}
				isLoading={isFetchingNextPage}
			>
				{Array(3)
					.fill(0)
					.map((_, i) => (
						<FeedSkeleton key={i} />
					))}
			</LoadMore>
		</>
	);
}
