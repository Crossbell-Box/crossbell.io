import { CharacterMetadata } from "crossbell";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";

import { useContract, useAddress } from "@crossbell/contract";
import { indexer } from "@crossbell/indexer";
import {
	SCOPE_KEY_CHARACTER,
	SCOPE_KEY_CHARACTER_BY_HANDLE,
	SCOPE_KEY_CHARACTERS,
	SCOPE_KEY_PRIMARY_CHARACTER,
} from "@crossbell/indexer";

import { asyncRetry } from "../utils";
import { useAccountState } from "./account-state";

// TODO: refactor this to use account-type-based-hooks
export function useCreateCharacter() {
	const address = useAddress();
	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async ({
			handle,
			metadata,
		}: {
			handle: string;
			metadata: CharacterMetadata;
		}) => {
			return contract.character.create({
				owner: address!,
				handle: handle,
				metadataOrUri: metadata,
			});
		},
		{
			onSuccess: (data, { handle }) => {
				return Promise.all([
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTER(data.data)),
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTERS(address)),
					queryClient.invalidateQueries(SCOPE_KEY_PRIMARY_CHARACTER(address)),
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTER_BY_HANDLE(handle)),
					useAccountState
						.getState()
						.refreshWallet()
						.then(async () => {
							const character = await asyncRetry(async (RETRY) => {
								return (await indexer.character.getByHandle(handle)) || RETRY;
							});

							if (character) {
								useAccountState.getState().switchCharacter(character);
							}
						}),
				]);
			},
			onError: (err: any) => {
				showNotification({
					title: "Error while creating character",
					message: err.message,
					color: "red",
				});
			},
		}
	);
}
