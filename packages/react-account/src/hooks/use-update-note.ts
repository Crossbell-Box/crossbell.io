import { NoteEntity, NoteMetadata } from "crossbell";
import {
	indexer,
	SCOPE_KEY_FOLLOWING_FEEDS_OF_CHARACTER,
	SCOPE_KEY_NOTE,
	SCOPE_KEY_NOTES_OF_CHARACTER,
} from "@crossbell/indexer";
import { Draft, produce } from "immer";

import { siweUpdateNote, updateNote } from "../apis";

import { createAccountTypeBasedMutationHooks } from "./account-type-based-hooks";

type EditFn = (draft: Draft<NoteMetadata>) => void;
type Variables = {
	edit: EditFn;
	note: Pick<NoteEntity, "characterId" | "noteId">;
};

const getMetadata = async ({
	note: { characterId, noteId },
	edit,
}: Variables) => {
	const note = await indexer.note.get(characterId, noteId);
	const oldMetadata = note?.metadata?.content;

	if (!oldMetadata) return null;

	const newMetadata = produce(oldMetadata, edit);

	// Skips redundant requests and just return success status directly.
	return oldMetadata === newMetadata ? null : newMetadata;
};

export const useUpdateNote = createAccountTypeBasedMutationHooks<
	void,
	Variables
>(
	{
		actionDesc: "",
		withParams: false,
	},
	() => {
		return {
			async email(variables, { account }) {
				if (variables.note.characterId !== account.characterId) return;

				const metadata = await getMetadata(variables);

				if (metadata) {
					await updateNote({
						token: account.token,
						metadata: metadata,
						noteId: variables.note.noteId,
					});
				}
			},

			wallet: {
				supportOPSign: true,

				async action(variables, { account, siwe, contract }) {
					const metadata = await getMetadata(variables);

					if (!metadata) return;

					if (siwe && variables.note.characterId === account.characterId) {
						await siweUpdateNote({
							siwe,
							characterId: variables.note.characterId,
							noteId: variables.note.noteId,
							metadata,
						});
					} else {
						await contract.note.setMetadata({
							characterId: variables.note.characterId,
							noteId: variables.note.noteId,
							metadata,
						});
					}
				},
			},

			onSuccess({ queryClient, variables, account }) {
				return Promise.all([
					queryClient.invalidateQueries(
						SCOPE_KEY_FOLLOWING_FEEDS_OF_CHARACTER(account?.characterId)
					),

					queryClient.invalidateQueries(
						SCOPE_KEY_NOTE(variables.note.characterId, variables.note.noteId)
					),

					queryClient.invalidateQueries(
						SCOPE_KEY_NOTES_OF_CHARACTER(variables.note.characterId)
					),
				]);
			},
		};
	}
);
