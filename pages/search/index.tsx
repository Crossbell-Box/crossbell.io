import SearchInput from "@/components/common/Input/SearchInput";
import LoadMore from "@/components/common/LoadMore";
import { Note, NoteSkeleton } from "@/components/common/Note";
import Tabs from "@/components/common/Tabs";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import CharacterProfile from "@/components/ui/CharacterProfile";
import type { NextPageWithLayout } from "@/pages/_app";
import {
	useCharacterByHandle,
	useNotesOfCharacter,
} from "@/utils/apis/indexer";
import { extractCharacterName } from "@/utils/metadata";
import {
	composeSearchHref,
	useCharacterRouterQuery,
	useSearchRouterQuery,
} from "@/utils/url";

import { Fragment } from "react";

// /search?q=xxx

const Page: NextPageWithLayout = () => {
	const { q, type: searchType } = useSearchRouterQuery();

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
								{
									label: "Treasures",
									route: composeSearchHref(q, "treasures"),
								},
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

			{/* profile */}
		</div>
	);
};

// function NotesList() {
// 	const { handle } = useCharacterRouterQuery();
// 	const { data: character } = useCharacterByHandle(handle);
// 	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
// 		useNotesOfCharacter(character?.characterId);

// 	return (
// 		<>
// 			{/* notes */}
// 			{data?.pages.map((page, i) => (
// 				<Fragment key={i}>
// 					{page.list.map((note, i) => (
// 						<Note note={note} key={`${note.characterId}-${note.noteId}`} />
// 					))}
// 				</Fragment>
// 			))}

// 			{isLoading &&
// 				Array(10)
// 					.fill(0)
// 					.map((_, i) => <NoteSkeleton key={i} />)}

// 			{/* load more */}
// 			<LoadMore
// 				onLoadMore={() => fetchNextPage()}
// 				hasNextPage={Boolean(hasNextPage)}
// 				isLoading={isFetchingNextPage}
// 			>
// 				{Array(3)
// 					.fill(0)
// 					.map((_, i) => (
// 						<NoteSkeleton key={i} />
// 					))}
// 			</LoadMore>
// 		</>
// 	);
// }

Page.getLayout = getLayout;

export default Page;
