import { Fragment, useEffect } from "react";
import LoadMore from "@/components/common/LoadMore";
import { Note, NoteSkeleton } from "@/components/common/Note";
import { getLayout } from "@/components/layouts/AppLayout";
import Header, { useHeaderSize } from "@/components/layouts/Header";
import { CommentTextarea } from "@/components/ui/CommentTextarea";
import type { NextPageWithLayout } from "@/pages/_app";
import {
	fetchCharacter,
	fetchNote,
	useCharacter,
	useNote,
	useNotesForNote,
} from "@/utils/apis/indexer";
import {
	composeCharacterHref,
	composeNoteHref,
	decomposeNoteId,
	getOrigin,
	useNoteRouterQuery,
} from "@/utils/url";
import { CharacterEntity, NoteEntity } from "crossbell.js";
import type { GetServerSideProps } from "next";
import { Divider } from "@mantine/core";
import { NextSeo } from "next-seo";
import { extractCharacterName, getValidAttachments } from "@/utils/metadata";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import { useScrollIntoView, useWindowScroll } from "@mantine/hooks";
import Head from "next/head";

const SEO = ({
	note,
	character,
}: {
	note?: NoteEntity | null;
	character?: CharacterEntity | null;
}) => {
	const origin = getOrigin();
	const images = getValidAttachments(note?.metadata?.content?.attachments, {
		allowedMediaTypes: ["image"],
		allowedContentTypes: ["address"],
	});

	return (
		<NextSeo
			openGraph={{
				type: "article",
				title:
					note?.metadata?.content?.title ??
					note?.metadata?.content?.content?.slice(0, 50),
				profile: {
					username: extractCharacterName(character),
				},
				description: note?.metadata?.content?.content,
				url: origin + composeNoteHref(note?.characterId!, note?.noteId!),
				article: {
					publishedTime: note?.createdAt,
					modifiedTime: note?.updatedAt,
					authors: [origin + composeCharacterHref(character?.handle!)],
					tags: note?.metadata?.content?.tags,
				},
				images: images.map((i) => ({
					url: ipfsLinkToHttpLink(i.address!),
					type: i.mime_type,
				})),
			}}
		/>
	);
};

// noteid format: {characterId}-{noteId}

type PageProps = {
	note: NoteEntity | null;
	character: CharacterEntity | null;
};

const Page: NextPageWithLayout<PageProps> = (props) => {
	const { characterId, noteId } = useNoteRouterQuery();

	const { data: note } = useNote(characterId, noteId, {
		initialData: props.note,
	});

	const { data: character } = useCharacter(characterId, {
		initialData: props.character,
	});

	const {
		data: comments,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useNotesForNote(characterId, noteId);

	// scroll into the main note
	const { height: headerHeight } = useHeaderSize();
	const {
		scrollIntoView: scrollToMainNote,
		targetRef: mainNoteRef,
		cancel: cancelScrollToMainNote,
	} = useScrollIntoView<HTMLDivElement>({
		offset: headerHeight,
		duration: 200,
	});

	const [windowScroll] = useWindowScroll();

	useEffect(() => {
		if (mainNoteRef.current && note?.toNote) {
			setTimeout(() => {
				if (windowScroll.y === 0) {
					scrollToMainNote();
				}
			}, 50);
		}

		return () => cancelScrollToMainNote();
	}, [mainNoteRef, note?.toNote, headerHeight, cancelScrollToMainNote]);

	return (
		<div>
			<Head>
				<title>
					{extractCharacterName(character)}: &quot;
					{note?.metadata?.content?.content
						?.toString()
						.slice(0, 100)
						.replace(/\n/g, "")}
					&quot;
				</title>
			</Head>

			<SEO note={note} character={props.character} />

			<Header hasBackButton>Note</Header>

			<div className="relative">
				{/* to note */}
				<div>
					{note?.toNote && (
						<Note note={note.toNote} character={note.toCharacter} />
					)}
				</div>

				{/* main note */}
				<div ref={mainNoteRef}>
					{note ? <Note note={note} character={character} /> : <NoteSkeleton />}
				</div>

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
									collapsible
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

				{/* margin bottom */}
				{!isFetchingNextPage && <div className="h-80vh" />}
			</div>
		</div>
	);
};

Page.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps<PageProps> = async (
	ctx
) => {
	const { noteid } = ctx.query;
	const { characterId, noteId } = decomposeNoteId(noteid as string);

	const [note, character] = (
		await Promise.allSettled([
			fetchNote(characterId, noteId),
			fetchCharacter(characterId),
		])
	).map((res) => {
		if (res.status === "fulfilled") {
			return res.value;
		} else {
			return null;
		}
	}) as [NoteEntity | null, CharacterEntity | null];

	return {
		props: {
			note,
			character,
		},
	};
};

export default Page;
