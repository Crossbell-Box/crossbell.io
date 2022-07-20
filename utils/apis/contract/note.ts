import { useContract } from "@/utils/crossbell.js";
import { showNotification } from "@mantine/notifications";
import { NoteMetadata } from "crossbell.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SCOPE_KEY_NOTES_OF_NOTE, useCurrentCharacter } from "../indexer";

export function usePostNoteForNote(
	targetCharacterId: number,
	targetNoteId: number
) {
	const { data: character } = useCurrentCharacter();
	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async (metadata: NoteMetadata) => {
			return contract.postNoteForNote(
				character?.characterId!,
				metadata,
				targetCharacterId,
				targetNoteId
			);
		},
		{
			onSuccess: () => {
				return queryClient.invalidateQueries(
					SCOPE_KEY_NOTES_OF_NOTE(targetCharacterId, targetNoteId)
				);
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
