import React from "react";
import { LRUCache } from "lru-cache";
import { NoteEntity } from "crossbell.js";
import { useRefCallback } from "@crossbell/util-hooks";
import { Note, NoteSkeleton } from "@/components/common/Note";
import { useNote } from "@crossbell/indexer";
import { HooksRenderer } from "@crossbell/ui";

export function GroupedFeedNote({
	note,
	collapsible,
	maxReplyCount = 2,
	isRepliedNote,
}: {
	note: NoteEntity;
	collapsible?: boolean;
	maxReplyCount?: number;
	isRepliedNote?: boolean;
}) {
	return (
		<>
			{maxReplyCount > 0 &&
				(() => {
					const nextMaxReplyCount = maxReplyCount - 1;

					if (note.toNote) {
						return (
							<GroupedFeedNote
								note={note.toNote}
								collapsible={collapsible}
								maxReplyCount={nextMaxReplyCount}
								isRepliedNote={true}
							/>
						);
					}

					if (note.toCharacterId && note.toNoteId) {
						return (
							<HooksRenderer
								hooks={useNote}
								params={[note.toCharacterId, note.toNoteId]}
							>
								{({ data }) =>
									data ? (
										<GroupedFeedNote
											note={data}
											collapsible={collapsible}
											maxReplyCount={nextMaxReplyCount}
											isRepliedNote={true}
										/>
									) : (
										<NoteSkeleton isRepliedNote={true} />
									)
								}
							</HooksRenderer>
						);
					}

					return null;
				})()}

			<Note
				note={note}
				character={note.character}
				collapsible={collapsible}
				isRepliedNote={isRepliedNote}
			/>
		</>
	);
}

export function useGroupedNotes<T>(
	items: T[],
	getNote_: (item: T) => NoteEntity | null | undefined
) {
	const getNote = useRefCallback(getNote_);

	return React.useMemo((): T[] => {
		const list: T[] = [];
		const cache = new LRUCache<NoteEntity["transactionHash"], NoteEntity>({
			max: 10,
		});

		items.forEach((item) => {
			const note = getNote(item);

			if (note) {
				if (note?.toNote) {
					cache.set(note.toNote.transactionHash, note.toNote);
				}

				if (!cache.has(note.transactionHash)) {
					list.push(item);
				}

				cache.set(note.transactionHash, note);
			} else {
				list.push(item);
			}
		});

		return list;
	}, [items, getNote]);
}
