import { indexer } from "../indexer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SCOPE_KEY_NOTE } from "./note";

const SCOPE_KEY = ["indexer", "metadata", "sync"];

export function useSyncMetadataOfNote(characterId: number, noteId: number) {
	const queryClient = useQueryClient();
	return useMutation(
		[...SCOPE_KEY, "note", characterId, noteId],
		() => indexer.metadata.syncForNote(characterId, noteId),
		{
			onSuccess: async (data) => {
				if (data) {
					await Promise.all([
						queryClient.invalidateQueries([
							SCOPE_KEY_NOTE(characterId, noteId),
						]),
					]);
				}
			},
		}
	);
}
