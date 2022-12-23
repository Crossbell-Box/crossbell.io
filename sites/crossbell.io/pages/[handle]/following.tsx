import { LoadMore } from "~/shared/components/load-more";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import type { NextPageWithLayout } from "@/pages/_app";
import { useCharacterByHandle } from "@crossbell/indexer";
import { extractCharacterName } from "@crossbell/util-metadata";
import { useCharacterRouterQuery } from "~/shared/url";
import { Fragment } from "react";
import { useRouter } from "next/router";
import FollowCharacterCard, {
	FollowCharacterSkeleton,
} from "@/components/card/FollowCharacterCard";
import { useFollowingCharactersOfCharacter } from "@crossbell/indexer";
import { Text } from "@mantine/core";
import { getServerSideProps as getServerSideProps_ } from "./index";
import Head from "next/head";
import { CharacterEntity } from "crossbell.js";

type PageProps = {
	character: CharacterEntity | null;
};

const Followings = () => {
	const { handle } = useCharacterRouterQuery();
	const { data: character } = useCharacterByHandle(handle);
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
		useFollowingCharactersOfCharacter(character?.characterId);

	return (
		<>
			{/* links */}
			{data?.pages.map((page, i) => (
				<Fragment key={i}>
					{page.list.map((link, i) => (
						<FollowCharacterCard
							key={link.toCharacterId}
							character={link.toCharacter!}
						/>
					))}
				</Fragment>
			))}
			{isLoading &&
				Array(10)
					.fill(0)
					.map((_, i) => <FollowCharacterSkeleton key={i} />)}

			{/* load more */}
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
		</>
	);
};

const Page: NextPageWithLayout<PageProps> = (props) => {
	const { handle, name } = useCharacterRouterQuery();
	const { data: character } = useCharacterByHandle(handle, {
		initialData: props.character,
	});

	const router = useRouter();

	const headerText =
		name ?? extractCharacterName(character) ?? handle ?? "Character";

	return (
		<div>
			<Head>
				<title>
					{`Characters followed by ${extractCharacterName(
						character
					)} (@${handle})`}
				</title>
			</Head>

			<Header hasBackButton>{headerText}</Header>

			<div className="flex flex-col mt-6 mb-4">
				<div className="flex flex-row border-bottom border-b-1px border-[#E1E8F7] w-full justify-around z-1">
					<div
						className="p-2 cursor-pointer"
						onClick={() => router.push(`${router.asPath}/../followers`)}
					>
						<Text size={"lg"}>Followers</Text>
					</div>
					<div className="p-2 border-b-2px border-[#FFCF55]">
						<Text size="lg" weight={600}>
							Following
						</Text>
					</div>
				</div>
				<Followings />
			</div>
		</div>
	);
};

Page.getLayout = getLayout;

export const getServerSideProps = getServerSideProps_;

export default Page;
