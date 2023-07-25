import { NoteEntity, NoteMetadata } from "crossbell";
import {
	SCOPE_KEY_NOTES_OF_NOTE,
	SCOPE_KEY_NOTE_STATUS,
} from "@crossbell/indexer";

import { putNote, siwePutNote } from "../apis";

import { createAccountTypeBasedMutationHooks } from "./account-type-based-hooks";

type Result = { transactionHash: string } | null;
type Variables = {
	note: Pick<NoteEntity, "characterId" | "noteId">;
	metadata: NoteMetadata;
};

export const usePostNoteForNote = createAccountTypeBasedMutationHooks<
	void,
	Variables,
	Result
>(
	{
		actionDesc: "",
		withParams: false,
	},
	() => ({
		async email({ metadata, note }, { account }) {
			return putNote({
				token: account.token,
				metadata,
				linkItemType: "Note",
				linkItem: {
					characterId: BigInt(note.characterId),
					noteId: BigInt(note.noteId),
				},
			});
		},

		wallet: {
			supportOPSign: true,

			async action({ metadata, note }, { account, siwe, contract }) {
				if (account?.characterId) {
					if (siwe) {
						return siwePutNote({
							characterId: account.characterId,
							siwe,
							metadata,
							linkItemType: "Note",
							linkItem: {
								characterId: BigInt(note.characterId),
								noteId: BigInt(note.noteId),
							},
						});
					} else {
						return contract.note.postForNote({
							characterId: account.characterId,
							metadataOrUri: metadata,
							targetCharacterId: note.characterId,
							targetNoteId: note.noteId,
						});
					}
				} else {
					return null;
				}
			},
		},

		onSuccess({ variables, queryClient }) {
			const { note } = variables;

			return Promise.all([
				queryClient.invalidateQueries(
					SCOPE_KEY_NOTES_OF_NOTE(note.characterId, note.noteId),
				),
				queryClient.invalidateQueries(SCOPE_KEY_NOTE_STATUS(note)),
			]);
		},
	}),
);
