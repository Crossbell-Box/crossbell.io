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
type Variables =
	| {
			edit: EditFn;
			note: Pick<NoteEntity, "characterId" | "noteId">;
	  }
	| {
			metadata: NoteMetadata;
			note: Pick<NoteEntity, "characterId" | "noteId">;
	  };
type Result = { transactionHash: string } | null;

const getMetadata = async (variables: Variables) => {
	const note = await indexer.note.get(
		variables.note.characterId,
		variables.note.noteId,
	);
	const oldMetadata = note?.metadata?.content;

	if (!oldMetadata) return null;

	const newMetadata =
		"metadata" in variables
			? variables.metadata
			: produce(oldMetadata, variables.edit);

	// Skips redundant requests and just return success status directly.
	return oldMetadata === newMetadata ? null : newMetadata;
};

export const useUpdateNote = createAccountTypeBasedMutationHooks<
	void,
	Variables,
	Result
>(
	{
		actionDesc: "useUpdateNote",
		withParams: false,
	},
	() => {
		return {
			async email(variables, { account }): Promise<Result> {
				if (variables.note.characterId !== account.characterId) return null;

				const metadata = await getMetadata(variables);

				if (!metadata) return null;

				return updateNote({
					token: account.token,
					metadata: metadata,
					noteId: variables.note.noteId,
				});
			},

			wallet: {
				supportOPSign: true,

				async action(variables, { account, siwe, contract }): Promise<Result> {
					const metadata = await getMetadata(variables);

					if (!metadata) return null;

					if (siwe && variables.note.characterId === account.characterId) {
						return siweUpdateNote({
							siwe,
							characterId: variables.note.characterId,
							noteId: variables.note.noteId,
							metadata,
						});
					} else {
						return contract.note.setMetadata({
							characterId: variables.note.characterId,
							noteId: variables.note.noteId,
							// crossbell.js will try to modify the object internally,
							// here the immutable object is converted to mutable object to avoid errors.
							metadata: JSON.parse(JSON.stringify(metadata)),
						});
					}
				},
			},

			onSuccess({ queryClient, variables, account }) {
				return Promise.all([
					queryClient.invalidateQueries(
						SCOPE_KEY_FOLLOWING_FEEDS_OF_CHARACTER(account?.characterId),
					),

					queryClient.invalidateQueries(
						SCOPE_KEY_NOTE(variables.note.characterId, variables.note.noteId),
					),

					queryClient.invalidateQueries(
						SCOPE_KEY_NOTES_OF_CHARACTER(variables.note.characterId),
					),
				]);
			},
		};
	},
);
