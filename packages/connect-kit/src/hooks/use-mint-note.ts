import { useContract } from "@crossbell/contract";
import { showNotification } from "@mantine/notifications";
import {
	useQueryClient,
	useMutation,
	UseMutationOptions,
} from "@tanstack/react-query";
import {
	SCOPE_KEY_MINTED_NOTE_OF_ADDRESS,
	SCOPE_KEY_MINTED_NOTE_OF_NOTE,
	SCOPE_KEY_NOTE_STATUS,
} from "@crossbell/indexer";
import { useAccountState } from "@crossbell/connect-kit";

export type UseMintNoteParams = {
	characterId: number;
	noteId: number;
};

export type UseMintNoteOptions = UseMutationOptions<
	unknown,
	unknown,
	UseMintNoteParams
>;

export function useMintNote(options?: UseMintNoteOptions) {
	const toAddress = useAccountState((s) => s.wallet?.address);
	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async ({ characterId, noteId }) => {
			return contract.mintNote(characterId, noteId, toAddress!);
		},
		{
			...options,

			onSuccess: (...params) => {
				const { characterId, noteId } = params[1];

				return Promise.all([
					options?.onSuccess?.(...params),

					queryClient.invalidateQueries(
						SCOPE_KEY_NOTE_STATUS(characterId, noteId)
					),
					queryClient.invalidateQueries(
						SCOPE_KEY_MINTED_NOTE_OF_NOTE(characterId, noteId)
					),
					queryClient.invalidateQueries(
						SCOPE_KEY_MINTED_NOTE_OF_ADDRESS(toAddress!)
					),
				]);
			},
			onError: (...params) => {
				const err = params[0];

				options?.onError?.(...params);

				showNotification({
					title: "Error while minting note",
					message: err instanceof Error ? err.message : `${err}`,
					color: "red",
				});
			},
		}
	);
}
