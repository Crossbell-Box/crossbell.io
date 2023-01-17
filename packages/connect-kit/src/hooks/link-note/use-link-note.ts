import {
	useMutation,
	useQueryClient,
	UseMutationOptions,
} from "@tanstack/react-query";
import React from "react";

import { useContract } from "@crossbell/contract";
import { NoteLinkType, SCOPE_KEY_NOTE_STATUS } from "@crossbell/indexer";

import { linkNote, siweLinkNote } from "../../apis";
import { useHandleError } from "../use-handle-error";
import { useAccountState } from "../account-state";

type UpdateFnParams = { characterId: number; noteId: number };
type UpdateFn = (params: UpdateFnParams) => Promise<unknown>;

export type UseLinkNoteOptions = UseMutationOptions<
	unknown,
	unknown,
	UpdateFnParams
>;

export function useLinkNote(
	linkType: NoteLinkType,
	options?: UseLinkNoteOptions
) {
	const account = useAccountState((s) => s.computed.account);
	const linkByContract = useLinkByContract(linkType, options ?? null);
	const linkByEmail = useLinkByEmail(linkType, options ?? null);

	return account?.type === "email" ? linkByEmail : linkByContract;
}

function useLinkByEmail(
	linkType: NoteLinkType,
	options: UseLinkNoteOptions | null
) {
	const account = useAccountState((s) => s.email);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId, noteId }) => {
			if (account) {
				return linkNote({
					token: account.token,
					toCharacterId: characterId,
					toNoteId: noteId,
					linkType: linkType,
				});
			} else {
				return false;
			}
		},
		[account, linkType]
	);

	return useBaseLinkNote(updateFn, options);
}

function useLinkByContract(
	linkType: NoteLinkType,
	options: UseLinkNoteOptions | null
) {
	const contract = useContract();
	const account = useAccountState((s) => s.wallet);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId, noteId }) => {
			if (account?.characterId) {
				if (account.siwe) {
					return siweLinkNote({
						token: account.siwe.token,
						characterId: account.characterId,
						toCharacterId: characterId,
						toNoteId: noteId,
						linkType: linkType,
					});
				} else {
					return contract.linkNote(
						account.characterId,
						characterId,
						noteId,
						linkType
					);
				}
			} else {
				return false;
			}
		},
		[account, contract, linkType]
	);

	return useBaseLinkNote(updateFn, options);
}

function useBaseLinkNote(
	updateFn: UpdateFn,
	options: UseLinkNoteOptions | null
) {
	const queryClient = useQueryClient();
	const handleError = useHandleError("Error while linking note");

	return useMutation((params: Parameters<UpdateFn>[0]) => updateFn(params), {
		...options,

		onSuccess: (...params) => {
			const { characterId, noteId } = params[1];

			return Promise.all([
				options?.onSuccess?.(...params),

				queryClient.invalidateQueries(
					SCOPE_KEY_NOTE_STATUS(characterId, noteId)
				),
			]);
		},

		onError: (...params) => {
			options?.onError?.(...params);
			handleError(params[0]);
		},
	});
}
