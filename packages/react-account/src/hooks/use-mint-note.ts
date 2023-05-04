import {
	SCOPE_KEY_MINTED_NOTE_OF_ADDRESS,
	SCOPE_KEY_MINTED_NOTE_OF_NOTE,
	SCOPE_KEY_NOTE_STATUS,
	SCOPE_KEY_NOTE_MINTS,
} from "@crossbell/indexer";

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
		connectType: "wallet",
	},
	() => ({
		wallet: {
			supportOPSign: true,

			async action({ characterId, noteId }, { contract, account, siwe }) {
				if (account?.address) {
					if (siwe) {
						await siweMintNote({ siwe, characterId, noteId });
					} else {
						await contract.note.mint(characterId, noteId, account.address);
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
		},

		onSuccess({ variables, queryClient, account }) {
			const { characterId, noteId } = variables;

			return Promise.all([
				queryClient.invalidateQueries(
					SCOPE_KEY_NOTE_MINTS(characterId, noteId)
				),
				queryClient.invalidateQueries(
					SCOPE_KEY_NOTE_STATUS({ characterId, noteId })
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
