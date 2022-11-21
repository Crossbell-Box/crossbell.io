import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CharacterEntity, NoteMetadata } from "crossbell.js";

import { useContract } from "@/utils/crossbell.js";

import { SCOPE_KEY_NOTES_OF_NOTE, SCOPE_KEY_NOTE_STATUS } from "../indexer";

export function usePostNoteForNote(
	targetCharacterId: number,
	targetNoteId: number,
	currentCharacter: CharacterEntity
) {
	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async (metadata: NoteMetadata) => {
			return contract.postNoteForNote(
				currentCharacter.characterId,
				metadata,
				targetCharacterId,
				targetNoteId
			);
		},
		{
			onSuccess: () => {
				return Promise.all([
					queryClient.invalidateQueries(
						SCOPE_KEY_NOTES_OF_NOTE(targetCharacterId, targetNoteId)
					),
					queryClient.invalidateQueries(
						SCOPE_KEY_NOTE_STATUS(targetCharacterId, targetNoteId)
					),
				]);
			},
			onError: (err: any) => {
				showNotification({
					title: "Error while posting note",
					message: err.message,
					color: "red",
				});
			},
		}
	);
}
