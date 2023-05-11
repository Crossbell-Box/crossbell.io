import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";

import { useContract, useAddress } from "@crossbell/contract";
import {
	SCOPE_KEY_CHARACTERS,
	SCOPE_KEY_PRIMARY_CHARACTER,
} from "@crossbell/indexer";

type UpdateFnParams = { characterId: number };

export type UseSetPrimaryCharacterOptions = UseMutationOptions<
	unknown,
	unknown,
	UpdateFnParams
>;

// TODO: refactor this to use account-type-based-hooks
export function useSetPrimaryCharacter(
	options?: UseSetPrimaryCharacterOptions
) {
	const address = useAddress();

	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async ({ characterId }) => {
			return contract.character.setPrimaryId({ characterId });
		},
		{
			...options,

			onSuccess: (...params) => {
				return Promise.all([
					options?.onSuccess?.(...params),
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTERS(address)),
					queryClient.invalidateQueries(SCOPE_KEY_PRIMARY_CHARACTER(address)),
				]);
			},
			onError: (...params) => {
				const err = params[0];

				options?.onError?.(...params);

				showNotification({
					title: "Error while setting primary character",
					message: err instanceof Error ? err.message : `${err}`,
					color: "red",
				});
			},
		}
	);
}
