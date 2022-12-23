/**
 * @example characterId: "42", noteId: "123" => "42-123"
 */
export const composeNoteId = (characterId: number, noteId: number) => {
	return `${characterId}-${noteId}`;
};

/**
 * @example "42-123" => characterId: "42", noteId: "123"
 */
export const decomposeNoteId = (composedNoteId: string) => {
	const [characterId, noteId] = composedNoteId?.split("-").map(Number) ?? [];
	return { characterId, noteId };
};
