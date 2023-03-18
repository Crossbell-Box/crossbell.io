import { useEffect } from "react";
import { Button, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

import type { NextPageWithLayout } from "@/pages/_app";
import { Promotion } from "@/components/promotion";
import { Feed, FeedSkeleton } from "@/components/common/Feed";
import { LoadMore } from "~/shared/components/load-more";
import Tabs from "@/components/common/Tabs";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import { useFollowingFeedsOfCharacter } from "@crossbell/indexer";
import { useLoginChecker } from "~/shared/wallet/hooks";
import {
	useAccountCharacter,
	useAccountHasCharacter,
} from "@crossbell/connect-kit";
import { useGroupedNotes } from "@/components/grouped-note";

const Page: NextPageWithLayout = () => {
	return (
		<div>
			<Header>xFeed</Header>
			<Promotion />
			<FeedTabs />
			<Home />
		</div>
	);
};

Page.getLayout = getLayout;

export default Page;

export function FeedTabs() {
	const tabs = [
		{ label: "Home", route: "/feed" },
		{ label: "Explore", route: "/explore" },
		{ label: "Latest", route: "/latest" },
	];

	const { validate } = useLoginChecker();

	// if no character, redirect to explore page
	const { hasCharacter, ssrReady } = useAccountHasCharacter();
	const router = useRouter();

	useEffect(() => {
		if (router.asPath === "/feed" && !hasCharacter && ssrReady) {
			router.replace("/explore");
		}
	}, [hasCharacter, ssrReady, router]);

	return (
		<Tabs
			tabs={tabs as any}
			defaultValue="/feed"
			beforeTabChange={(value) => {
				if (value === "/feed") {
					return validate();
				}
			}}
		/>
	);
}

function Home() {
	return (
		<div>
			<FeedList />
		</div>
	);
}

function FeedList() {
	const character = useAccountCharacter();
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
		useFollowingFeedsOfCharacter(character?.characterId);

	const hasNoResult = !isLoading && !data?.pages.some((p) => p.count > 0);
	const list = useGroupedNotes(
		data?.pages.flatMap((page) => page.list) ?? [],
		(feed) => feed.note
	);

	return (
		<>
			{/* feeds */}
			{list.map((feed) => (
				<Feed
					feed={feed}
					key={`${feed.transactionHash}-${feed.logIndex}`}
					collapsible
				/>
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

			{hasNoResult && (
				<div className="flex flex-col items-center justify-center">
					<img
						src="/illustrations/alone.svg"
						alt="Not following anyone yet"
						className="w-full"
					/>

					<Text className="my-5" weight={500}>
						No content. Explore to follow some characters.
					</Text>

					<Button
						className="text-dark"
						size="lg"
						component={Link}
						href="/explore"
					>
						Explore
					</Button>
				</div>
			)}
		</>
	);
}
