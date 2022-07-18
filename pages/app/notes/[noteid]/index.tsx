import { Fragment } from "react";
import LoadMore from "@/components/common/LoadMore";
import { Note, NoteSkeleton } from "@/components/common/Note";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import { CommentTextarea } from "@/components/ui/CommentTextarea";
import type { NextPageWithLayout } from "@/pages/_app";
import { fetchNote, useNote, useNotesForNote } from "@/utils/apis/indexer";
import { useNoteRouterQuery } from "@/utils/url";
import { NoteEntity } from "crossbell.js";
import type { GetServerSideProps } from "next";
import { Divider } from "@mantine/core";

// noteid format: {characterId}-{noteId}

type PageProps = {
	note: NoteEntity | null;
};

const Page: NextPageWithLayout<PageProps> = (props) => {
	const { characterId, noteId } = useNoteRouterQuery();

	const { data: note } = useNote(characterId, noteId, {
		// initialData: props.note,
	});

	const {
		data: comments,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useNotesForNote(characterId, noteId);

	return (
		<div>
			<Header hasBackButton>Note</Header>

			{/* main note */}
			<div>{note ? <Note note={note} /> : <NoteSkeleton />}</div>

			{/* comment textarea */}
			<div>{note && <CommentTextarea note={note} />}</div>

			<Divider />

			{/* comments */}
			<div>
				{comments?.pages.map((page, i) => (
					<Fragment key={i}>
						{page.list.map((comment, i) => (
							<Note
								key={`${comment.transactionHash}-${comment.logIndex}`}
								note={comment}
							/>
						))}
					</Fragment>
				))}

				{/* load more */}
				<LoadMore
					hasNextPage={Boolean(hasNextPage)}
					isLoading={isFetchingNextPage}
					onLoadMore={() => fetchNextPage()}
				>
					<NoteSkeleton />
					<NoteSkeleton />
					<NoteSkeleton />
				</LoadMore>
			</div>
		</div>
	);
};

Page.getLayout = getLayout;

// export const getServerSideProps: GetServerSideProps<PageProps> = async (
// 	ctx
// ) => {
// 	const { noteid } = ctx.query;
// 	const { characterId, noteId } = decomposeNoteId(noteid as string);

// 	const note = await fetchNote(characterId, noteId);

// 	return {
// 		props: {
// 			note,
// 		},
// 	};
// };

export default Page;
