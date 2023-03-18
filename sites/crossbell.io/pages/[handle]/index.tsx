import { LoadMore } from "~/shared/components/load-more";
import { Note, NoteSkeleton } from "@/components/common/Note";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import CharacterProfile from "@/components/ui/CharacterProfile";
import TreasuresGallery from "@/components/ui/TreasuresGallery";
import { Image } from "~/shared/components/image";
import type { NextPageWithLayout } from "@/pages/_app";
import {
	fetchCharacterByHandle,
	useCharacterByHandle,
	useNotesOfCharacter,
} from "@crossbell/indexer";
import { ipfsLinkToHttpLink } from "~/shared/ipfs";
import {
	extractCharacterAvatars,
	extractCharacterName,
} from "@crossbell/util-metadata";
import {
	composeCharacterHref,
	composeXCharHref,
	useCharacterRouterQuery,
} from "~/shared/url";
import { Space } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

import xCharBanner from "@/public/images/pages/character/xchar-banner.png";
import { useGroupedNotes, GroupedFeedNote } from "@/components/grouped-note";

type PageProps = {
	character: CharacterEntity | null;
};

const Page: NextPageWithLayout<PageProps> = (props) => {
	const { handle, name } = useCharacterRouterQuery();
	const { data: character } = useCharacterByHandle(handle, {
		initialData: props.character,
	});

	const headerText =
		name ?? extractCharacterName(character) ?? handle ?? "xCharacter";

	return (
		<div>
			<Seo character={character} />
			<Header hasBackButton>{headerText}</Header>

			<div className="p-2">
				<a
					href={composeXCharHref(handle)}
					className="block relative aspect-728/40"
					target="_blank"
					rel="noreferrer"
				>
					<Image
						placeholder="empty"
						src={xCharBanner}
						fill={true}
						alt="xChar Banner"
					/>
				</a>
			</div>

			{/* profile */}
			<CharacterProfile character={character} />
			{/* treasures */}
			<TreasuresGallery address={character?.owner} />
			{/* TODO: tabs */}
			<Space h={20} />
			<NotesList />
		</div>
	);
};

function NotesList() {
	const { handle } = useCharacterRouterQuery();
	const { data: character } = useCharacterByHandle(handle);
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
		useNotesOfCharacter(character?.characterId);

	const list = useGroupedNotes(
		data?.pages.flatMap((page) => page.list) ?? [],
		(note) => note
	);

	return (
		<>
			{/* notes */}
			{list.map((note) => (
				<GroupedFeedNote
					note={note}
					key={`${note.characterId}-${note.noteId}`}
					collapsible
				/>
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

Page.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps<PageProps> = async (
	ctx
) => {
	const { handle } = ctx.query;
	const isValidHandleUrl = typeof handle === "string" && handle.startsWith("@");
	if (!isValidHandleUrl) {
		return {
			notFound: true,
		};
	}

	const handleWithoutAtPrefix = handle.replace("@", "");

	const character = await fetchCharacterByHandle(handleWithoutAtPrefix);

	if (!character) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			character,
		},
	};
};

function Seo({ character }: { character?: CharacterEntity | null }) {
	const title = `${extractCharacterName(character)} (@${character?.handle})`;
	const description =
		character?.metadata?.content?.bio ??
		`Follow ${title} on Crossbell blockchain to see their notes and treasures.`;

	const { handle } = useCharacterRouterQuery();

	return (
		<NextSeo
			title={title}
			description={description}
			openGraph={{
				type: "profile",
				title,
				description,
				url: composeCharacterHref(character?.handle ?? handle),
				profile: {
					firstName: extractCharacterName(character),
					username: character?.handle,
				},
				images: extractCharacterAvatars(character).map((url) => ({
					url: ipfsLinkToHttpLink(url),
					alt: "Avatar",
				})),
			}}
		/>
	);
}

export default Page;
