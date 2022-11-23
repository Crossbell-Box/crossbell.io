import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import React from "react";

import { useContract } from "@/utils/crossbell.js";
import { NoteLinkType, SCOPE_KEY_NOTE_STATUS } from "@/utils/apis/indexer";

import { unlinkNote } from "../../apis";
import { useAccountState } from "../account-state";

type UpdateFn = (params: {
	characterId: number;
	noteId: number;
}) => Promise<unknown>;

export function useUnlinkNote(linkType: NoteLinkType) {
	const account = useAccountState((s) => s.computed.account);
	const unlinkByContract = useUnlinkByContract(linkType);
	const unlinkByEmail = useUnlinkByEmail(linkType);

	return account?.type === "email" ? unlinkByEmail : unlinkByContract;
}

function useUnlinkByEmail(linkType: NoteLinkType) {
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

	return useBaseUnlinkNote(linkType, updateFn);
}

function useUnlinkByContract(linkType: NoteLinkType) {
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

	return useBaseUnlinkNote(linkType, updateFn);
}

function useBaseUnlinkNote(linkType: NoteLinkType, updateFn: UpdateFn) {
	const queryClient = useQueryClient();

	return useMutation((params: Parameters<UpdateFn>[0]) => updateFn(params), {
		onSuccess: (_, { characterId, noteId }) => {
			return queryClient.invalidateQueries(
				SCOPE_KEY_NOTE_STATUS(characterId, noteId)
			);
		},
		onError: (err: any) => {
			showNotification({
				title: "Error while linking note",
				message: err.message,
				color: "red",
			});
		},
	});
}
