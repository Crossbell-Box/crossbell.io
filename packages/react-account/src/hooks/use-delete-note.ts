import { NoteEntity } from "crossbell";
import {
	SCOPE_KEY_FOLLOWING_FEEDS_OF_CHARACTER,
	SCOPE_KEY_NOTE,
	SCOPE_KEY_NOTES_OF_CHARACTER,
} from "@crossbell/indexer";

import { deleteNote, siweDeleteNote } from "../apis";

import { createAccountTypeBasedMutationHooks } from "./account-type-based-hooks";

export const useDeleteNote = createAccountTypeBasedMutationHooks<
	void,
	Pick<NoteEntity, "noteId" | "characterId">
>(
	{
		actionDesc: "Delete Note",
		withParams: false,
	},
	() => ({
		async email({ noteId, characterId }, { account }) {
			if (characterId === account.characterId) {
				await deleteNote({ token: account.token, noteId });
			}
		},

		wallet: {
			supportOPSign: true,

			async action({ characterId, noteId }, { account, siwe, contract }) {
				if (siwe && account.characterId === characterId) {
					await siweDeleteNote({ siwe, characterId, noteId });
				} else {
					await contract.note.delete(characterId, noteId);
				}
			},
		},

		onSuccess({ queryClient, account, variables }) {
			return Promise.all([
				queryClient.invalidateQueries(
					SCOPE_KEY_FOLLOWING_FEEDS_OF_CHARACTER(account?.characterId)
				),

				queryClient.invalidateQueries(
					SCOPE_KEY_NOTE(variables.characterId, variables.noteId)
				),

				queryClient.invalidateQueries(
					SCOPE_KEY_NOTES_OF_CHARACTER(variables.characterId)
				),
			]);
		},
	})
);
