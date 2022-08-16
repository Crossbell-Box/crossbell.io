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
import { Button, Space, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useAccount } from "wagmi";
import { useModals } from "@mantine/modals";
import Image from "@/components/common/Image";
import Link from "next/link";
import { WalletCharacterNewHref } from "@/utils/url";
import { useRouter } from "next/router";

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

	const modals = useModals();

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
						const id = modals.openModal({
							title: "Please Connect Wallet",
							children: (
								<div>
									<Text>You need to be connected to see your feed.</Text>
									<Space h={5} />
									<Button
										onClick={() => modals.closeModal(id)}
										fullWidth
										size="lg"
									>
										OK
									</Button>
								</div>
							),
						});

						return true;
					}

					// not minted character yet
					if (!character) {
						const id = modals.openModal({
							styles: {
								modal: { background: "transparent" },
							},
							padding: 0,
							children: (
								<div
									className="relative flex justify-center items-center"
									onClick={() => modals.closeModal(id)}
								>
									{/* close btn */}
									<div className="absolute top-0 right-0 w-100px h-100px cursor-pointer"></div>
									{/* mint btn */}
									<Link href={WalletCharacterNewHref}>
										<div className="absolute bottom-0 left-0 right-0 h-100px cursor-pointer"></div>
									</Link>
									<Image
										src="/images/mint-character-guide-card.png"
										width={400}
										height={600}
									/>
								</div>
							),
						});

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
