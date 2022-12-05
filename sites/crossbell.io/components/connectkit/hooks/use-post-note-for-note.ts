import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoteEntity, NoteMetadata } from "crossbell.js";
import React from "react";

import { useContract } from "@/utils/crossbell.js";
import {
	SCOPE_KEY_NOTES_OF_NOTE,
	SCOPE_KEY_NOTE_STATUS,
} from "@crossbell/indexer";

import { putNote } from "../apis";

import { useAccountState } from "./account-state";

type UpdateFn = (params: {
	note: NoteEntity;
	metadata: NoteMetadata;
}) => Promise<unknown>;

export function usePostNoteForNote() {
	const account = useAccountState((s) => s.computed.account);
	const postByContract = usePostByContract();
	const postByEmail = usePostByEmail();

	return account?.type === "email" ? postByEmail : postByContract;
}

function usePostByEmail() {
	const account = useAccountState((s) => s.email);

	const updateFn: UpdateFn = React.useCallback(
		async ({ metadata, note }) => {
			if (account) {
				return putNote({
					token: account.token,
					metadata,
					linkItemType: "Note",
					linkItem: { characterId: note.characterId, noteId: note.noteId },
				});
			} else {
				return null;
			}
		},
		[account]
	);

	return useBasePostNoteForNote(updateFn);
}

function usePostByContract() {
	const contract = useContract();
	const account = useAccountState((s) => s.wallet);

	const updateFn: UpdateFn = React.useCallback(
		async ({ metadata, note }) => {
			if (typeof account?.characterId === "number") {
				return contract.postNoteForNote(
					account.characterId,
					metadata,
					note.characterId,
					note.noteId
				);
			} else {
				return null;
			}
		},
		[contract, account]
	);

	return useBasePostNoteForNote(updateFn);
}

function useBasePostNoteForNote(updateFn: UpdateFn) {
	const queryClient = useQueryClient();

	return useMutation(
		async (params: Parameters<UpdateFn>[0]) => updateFn(params),
		{
			onSuccess: (_, { note }) => {
				return Promise.all([
					queryClient.invalidateQueries(
						SCOPE_KEY_NOTES_OF_NOTE(note.characterId, note.noteId)
					),
					queryClient.invalidateQueries(
						SCOPE_KEY_NOTE_STATUS(note.characterId, note.noteId)
					),
				]);
			},
			onError: (err) => {
				showNotification({
					title: "Error while posting note",
					message: `${err}`,
					color: "red",
				});
			},
		}
	);
}
