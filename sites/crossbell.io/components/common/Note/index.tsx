import { CharacterEntity, NoteEntity } from "crossbell.js";

import { useNoteRouterQuery } from "~/shared/url";

import { MainNote } from "./main-note";
import { FeedNote } from "./feed-note";

export * from "./components/note-skeleton";

export function Note({
	note,
	character,
	collapsible,
	displayMode,
	isRepliedNote,
}: {
	collapsible?: boolean;
	note: NoteEntity;
	character?: CharacterEntity | null;
	/**
	 * - `normal`: normal view
	 * - `main`: emphasizing the main note in a single page
	 * This is smartly calculated from url unless specified.
	 */
	displayMode?: "normal" | "main";
	isRepliedNote?: boolean;
}) {
	const { characterId, noteId } = useNoteRouterQuery();
	const isMainNote =
		displayMode === "main" ||
		(characterId === note.characterId && noteId === note.noteId);

	return isMainNote ? (
		<MainNote note={note} character={character} collapsible={collapsible} />
	) : (
		<FeedNote
			isRepliedNote={isRepliedNote}
			note={note}
			character={character}
			collapsible={collapsible}
		/>
	);
}
