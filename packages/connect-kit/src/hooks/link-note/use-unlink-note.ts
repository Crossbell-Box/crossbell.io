import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import React from "react";

import { useContract } from "@crossbell/contract";
import { NoteLinkType, SCOPE_KEY_NOTE_STATUS } from "@crossbell/indexer";

import { unlinkNote } from "../../apis";
import { useAccountState } from "../account-state";

type UpdateFnParams = { characterId: number; noteId: number };
type UpdateFn = (params: UpdateFnParams) => Promise<unknown>;

export type UseUnlinkNoteOptions = UseMutationOptions<
	unknown,
	unknown,
	UpdateFnParams
>;

export function useUnlinkNote(
	linkType: NoteLinkType,
	options?: UseUnlinkNoteOptions
) {
	const account = useAccountState((s) => s.computed.account);
	const unlinkByContract = useUnlinkByContract(linkType, options ?? null);
	const unlinkByEmail = useUnlinkByEmail(linkType, options ?? null);

	return account?.type === "email" ? unlinkByEmail : unlinkByContract;
}

function useUnlinkByEmail(
	linkType: NoteLinkType,
	options: UseUnlinkNoteOptions | null
) {
	const account = useAccountState((s) => s.email);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId, noteId }) => {
			if (account) {
				return unlinkNote({
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

	return useBaseUnlinkNote(updateFn, options);
}

function useUnlinkByContract(
	linkType: NoteLinkType,
	options: UseUnlinkNoteOptions | null
) {
	const contract = useContract();
	const account = useAccountState((s) => s.wallet);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId, noteId }) => {
			if (account?.characterId) {
				return contract.unlinkNote(
					account.characterId,
					characterId,
					noteId,
					linkType
				);
			} else {
				return false;
			}
		},
		[account, contract, linkType]
	);

	return useBaseUnlinkNote(updateFn, options);
}

function useBaseUnlinkNote(
	updateFn: UpdateFn,
	options: UseUnlinkNoteOptions | null
) {
	const queryClient = useQueryClient();

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
			const err = params[0];

			options?.onError?.(...params);

			showNotification({
				title: "Error while unlinking note",
				message: err instanceof Error ? err.message : `${err}`,
				color: "red",
			});
		},
	});
}
