import { useContract } from "@crossbell/contract";
import { showNotification } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
	SCOPE_KEY_MINTED_NOTE_OF_ADDRESS,
	SCOPE_KEY_MINTED_NOTE_OF_NOTE,
	SCOPE_KEY_NOTE_STATUS,
} from "@crossbell/indexer";

export function useMintNote(
	characterId: number,
	noteId: number,
	toAddress: string
) {
	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async () => {
			return contract.mintNote(characterId, noteId, toAddress);
		},
		{
			onSuccess: () => {
				return Promise.all([
					queryClient.invalidateQueries(
						SCOPE_KEY_NOTE_STATUS(characterId, noteId)
					),
					queryClient.invalidateQueries(
						SCOPE_KEY_MINTED_NOTE_OF_NOTE(characterId, noteId)
					),
					queryClient.invalidateQueries(
						SCOPE_KEY_MINTED_NOTE_OF_ADDRESS(toAddress)
					),
				]);
			},
			onError: (err: any) => {
				showNotification({
					title: "Error while minting note",
					message: err.message,
					color: "red",
				});
			},
		}
	);
}
