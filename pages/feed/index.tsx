import { Feed, FeedSkeleton } from "@/components/common/Feed";
import LoadMore from "@/components/common/LoadMore";
import Tabs from "@/components/common/Tabs";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import type { NextPageWithLayout } from "@/pages/_app";
import {
	useCurrentCharacter,
	useFollowingFeedsOfCharacter,
	useHasCharacter,
} from "@/utils/apis/indexer";
import { Fragment, useEffect } from "react";
import { Button, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import {
	openConnectWalletHintModel,
	openMintNewCharacterModel,
} from "@/components/common/NewUserGuide";

const Page: NextPageWithLayout = () => {
	return (
		<div>
			<Header>Feed</Header>

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
	];

	const { isConnected } = useAccount();
	const { data: character } = useCurrentCharacter();

	// if no character, redirect to explore page
	const { hasCharacter, isLoadingCharacter } = useHasCharacter();
	const router = useRouter();
	useEffect(() => {
		if (!isLoadingCharacter && !hasCharacter) {
			router.replace("/explore");
		}
	}, [isLoadingCharacter, hasCharacter, router]);

	return (
		<Tabs
			tabs={tabs as any}
			defaultValue="/feed"
			beforeTabChange={(value) => {
				if (value === "/feed") {
					// not connected
					if (!isConnected) {
						openConnectWalletHintModel();

						return true;
					}

					// not minted character yet
					if (!character) {
						openMintNewCharacterModel();

						return true;
					}
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
	const { data: character } = useCurrentCharacter();
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
		useFollowingFeedsOfCharacter(character?.characterId);

	const hasNoResult = !isLoading && !data?.pages.some((p) => p.count > 0);

	return (
		<>
			{/* feeds */}
			{data?.pages.map((page, i) => (
				<Fragment key={i}>
					{page.list.map((feed, i) => (
						<Feed
							feed={feed}
							key={`${feed.transactionHash}-${feed.logIndex}`}
							collapsible
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
						component={NextLink}
						href="/explore"
					>
						Explore
					</Button>
				</div>
			)}
		</>
	);
}
