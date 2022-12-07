import LoadMore from "@/components/common/LoadMore";
import { Note, NoteSkeleton } from "@/components/common/Note";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import CharacterProfile from "@/components/ui/CharacterProfile";
import TreasuresGallery from "@/components/ui/TreasuresGallery";
import type { NextPageWithLayout } from "@/pages/_app";
import {
	fetchCharacterByHandle,
	useCharacterByHandle,
	useNotesOfCharacter,
} from "@crossbell/indexer";
import { ipfsLinkToHttpLink } from "@crossbell/util-ipfs";
import {
	extractCharacterAvatars,
	extractCharacterName,
} from "@/utils/metadata";
import {
	composeCharacterHref,
	getOrigin,
	useCharacterRouterQuery,
} from "@/utils/url";
import { Space } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

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

	return (
		<>
			{/* notes */}
			{data?.pages.map((page, i) => (
				<Fragment key={i}>
					{page.list.map((note, i) => (
						<Note
							note={note}
							key={`${note.characterId}-${note.noteId}`}
							collapsible
						/>
					))}
				</Fragment>
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
				url: getOrigin() + composeCharacterHref(character?.handle ?? handle),
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
