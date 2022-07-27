import LoadMore from "@/components/common/LoadMore";
import { Note, NoteSkeleton } from "@/components/common/Note";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import CharacterProfile from "@/components/ui/CharacterProfile";
import type { NextPageWithLayout } from "@/pages/_app";
import {
	useCharacterByHandle,
	useNotesOfCharacter,
} from "@/utils/apis/indexer";
import { extractCharacterName } from "@/utils/metadata";
import { useCharacterRouterQuery } from "@/utils/url";
import { Fragment } from "react";

const Page: NextPageWithLayout = () => {
	const { handle, name } = useCharacterRouterQuery();
	const { data: character } = useCharacterByHandle(handle);

	const headerText =
		name ?? extractCharacterName(character) ?? handle ?? "Character";

	return (
		<div>
			<Header hasBackButton>{headerText}</Header>

			{/* profile */}
			<CharacterProfile character={character} />

			{/* TODO: tabs */}

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
						<Note note={note} key={`${note.characterId}-${note.noteId}`} />
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

export default Page;
