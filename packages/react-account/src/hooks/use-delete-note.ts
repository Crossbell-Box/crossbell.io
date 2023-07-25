import { NoteEntity } from "crossbell";
import {
	SCOPE_KEY_FOLLOWING_FEEDS_OF_CHARACTER,
	SCOPE_KEY_NOTE,
	SCOPE_KEY_NOTES_OF_CHARACTER,
} from "@crossbell/indexer";

import { deleteNote, siweDeleteNote } from "../apis";

import { createAccountTypeBasedMutationHooks } from "./account-type-based-hooks";

type Result = { transactionHash: string } | null;

export const useDeleteNote = createAccountTypeBasedMutationHooks<
	void,
	Pick<NoteEntity, "noteId" | "characterId">,
	Result
>(
	{
		actionDesc: "Delete Note",
		withParams: false,
	},
	() => ({
		async email({ noteId, characterId }, { account }) {
			if (characterId === account.characterId) {
				return deleteNote({ token: account.token, noteId });
			} else {
				return null;
			}
		},

		wallet: {
			supportOPSign: true,

			async action({ characterId, noteId }, { account, siwe, contract }) {
				if (siwe && account.characterId === characterId) {
					return siweDeleteNote({ siwe, characterId, noteId });
				} else {
					return contract.note.delete({ characterId, noteId });
				}
			},
		},

		onSuccess({ queryClient, account, variables }) {
			return Promise.all([
				queryClient.invalidateQueries(
					SCOPE_KEY_FOLLOWING_FEEDS_OF_CHARACTER(account?.characterId),
				),

				queryClient.invalidateQueries(
					SCOPE_KEY_NOTE(variables.characterId, variables.noteId),
				),

				queryClient.invalidateQueries(
					SCOPE_KEY_NOTES_OF_CHARACTER(variables.characterId),
				),
			]);
		},
	}),
);
