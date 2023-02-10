import {
	SCOPE_KEY_MINTED_NOTE_OF_ADDRESS,
	SCOPE_KEY_MINTED_NOTE_OF_NOTE,
	SCOPE_KEY_NOTE_STATUS,
} from "@crossbell/indexer";

import { useUpgradeAccountModal } from "../modals/upgrade-account-modal/stores/modal-store";
import { siweMintNote, getIsNoteMinted } from "../apis";
import { asyncRetry } from "../utils";
import { createAccountTypeBasedMutationHooks } from "./account-type-based-hooks";

export const useMintNote = createAccountTypeBasedMutationHooks<
	void,
	{ characterId: number; noteId: number }
>(
	{
		actionDesc: "mint-note",
		withParams: false,
	},
	() => ({
		async email() {
			useUpgradeAccountModal.getState().show();
		},

		async contract({ characterId, noteId }, { contract, account, siwe }) {
			if (account?.address) {
				if (siwe) {
					await siweMintNote({ siwe, characterId, noteId });
				} else {
					await contract.mintNote(characterId, noteId, account.address);
				}

				await asyncRetry(
					async (RETRY) =>
						(await getIsNoteMinted({
							noteId,
							noteCharacterId: characterId,
							byAddress: account.address,
						})) || RETRY
				);
			}
		},

		onSuccess({ variables, queryClient, account }) {
			const { characterId, noteId } = variables;

			return Promise.all([
				queryClient.invalidateQueries(
					SCOPE_KEY_NOTE_STATUS(characterId, noteId)
				),
				queryClient.invalidateQueries(
					SCOPE_KEY_MINTED_NOTE_OF_NOTE(characterId, noteId)
				),
				queryClient.invalidateQueries(
					SCOPE_KEY_MINTED_NOTE_OF_ADDRESS(account?.address ?? "")
				),
			]);
		},
	})
);
