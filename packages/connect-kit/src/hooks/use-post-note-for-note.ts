import { showNotification } from "@mantine/notifications";
import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { NoteEntity, NoteMetadata } from "crossbell.js";
import React from "react";

import { useContract } from "@crossbell/contract";
import {
	SCOPE_KEY_NOTES_OF_NOTE,
	SCOPE_KEY_NOTE_STATUS,
} from "@crossbell/indexer";

import { putNote } from "../apis";

import { useAccountState } from "./account-state";

type UpdateFnParams = {
	note: Pick<NoteEntity, "characterId" | "noteId">;
	metadata: NoteMetadata;
};
type UpdateFn = (params: UpdateFnParams) => Promise<unknown>;

export type UsePostNoteForNoteOptions = UseMutationOptions<
	unknown,
	unknown,
	UpdateFnParams
>;

export function usePostNoteForNote(options?: UsePostNoteForNoteOptions) {
	const account = useAccountState((s) => s.computed.account);
	const postByContract = usePostByContract(options ?? null);
	const postByEmail = usePostByEmail(options ?? null);

	return account?.type === "email" ? postByEmail : postByContract;
}

function usePostByEmail(options: UsePostNoteForNoteOptions | null) {
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

	return useBasePostNoteForNote(updateFn, options);
}

function usePostByContract(options: UsePostNoteForNoteOptions | null) {
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

	return useBasePostNoteForNote(updateFn, options);
}

function useBasePostNoteForNote(
	updateFn: UpdateFn,
	options: UsePostNoteForNoteOptions | null
) {
	const queryClient = useQueryClient();

	return useMutation(
		async (params: Parameters<UpdateFn>[0]) => updateFn(params),
		{
			...options,

			onSuccess: (...params) => {
				const { note } = params[1];

				return Promise.all([
					options?.onSuccess?.(...params),

					queryClient.invalidateQueries(
						SCOPE_KEY_NOTES_OF_NOTE(note.characterId, note.noteId)
					),
					queryClient.invalidateQueries(
						SCOPE_KEY_NOTE_STATUS(note.characterId, note.noteId)
					),
				]);
			},
			onError: (...params) => {
				const err = params[0];

				options?.onError?.(...params);

				showNotification({
					title: "Error while posting note",
					message: err instanceof Error ? err.message : `${err}`,
					color: "red",
				});
			},
		}
	);
}
