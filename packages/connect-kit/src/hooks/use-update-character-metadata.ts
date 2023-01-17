import { produce, Draft } from "immer";
import { CharacterMetadata } from "crossbell.js";
import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { useContract } from "@crossbell/contract";
import { SCOPE_KEY_CHARACTER } from "@crossbell/indexer";

import { siweUpdateMetadata, updateCharactersMetadata } from "../apis";
import { useAccountState } from "./account-state";
import { useHandleError } from "./use-handle-error";

type UpdateFn = (draft: Draft<CharacterMetadata>) => void;

export type UseUpdateCharacterMetadataOptions = UseMutationOptions<
	unknown,
	unknown,
	UpdateFn
>;

export function useUpdateCharacterMetadata(
	options?: UseUpdateCharacterMetadataOptions
) {
	const contract = useContract();
	const queryClient = useQueryClient();
	const characterId = useAccountState((s) => s.computed.account?.characterId);
	const handleError = useHandleError("Error while setting character metadata");

	return useMutation(
		async (update: UpdateFn) => {
			// Make sure character metadata is up-to-date.
			await useAccountState.getState().refresh();
			const account = useAccountState.getState().computed.account;

			if (!account?.character) return;

			const oldMetadata = account.character.metadata?.content ?? {};
			const newMetadata = produce(oldMetadata, update);

			// Skips redundant requests and just return success status directly.
			if (oldMetadata === newMetadata) return;

			switch (account.type) {
				case "email":
					await updateCharactersMetadata({
						token: account.token,
						metadata: newMetadata,
					});
					return;
				case "wallet":
					if (account.siwe) {
						await siweUpdateMetadata({
							token: account.siwe.token,
							characterId: account.character.characterId,
							metadata: newMetadata,
						});
					} else {
						await contract.setCharacterMetadata(
							account.character.characterId,
							// crossbell.js will try to modify the object internally,
							// here the immutable object is converted to mutable object to avoid errors.
							JSON.parse(JSON.stringify(newMetadata))
						);
					}
					return;
			}
		},
		{
			...options,

			onSuccess(...params) {
				return Promise.all([
					options?.onSuccess?.(...params),
					useAccountState.getState().refresh(),
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTER(characterId)),
				]);
			},

			onError: (...params) => {
				options?.onError?.(...params);
				handleError(params[0]);
			},
		}
	);
}
