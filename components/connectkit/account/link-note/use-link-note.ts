import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import React from "react";

import { useContract } from "@/utils/crossbell.js";
import { SCOPE_KEY_NOTE_STATUS } from "@/utils/apis/indexer";

import { linkNote } from "../../apis";
import { useAccountStore } from "../account-store";

import { NoteLinkType } from "./types";

type UpdateFn = (params: {
	characterId: number;
	noteId: number;
}) => Promise<unknown>;

export function useLinkNote(linkType: NoteLinkType) {
	const account = useAccountStore((s) => s.computed.account);
	const linkByContract = useLinkByContract(linkType);
	const linkByEmail = useLinkByEmail(linkType);

	return account?.type === "email" ? linkByEmail : linkByContract;
}

function useLinkByEmail(linkType: NoteLinkType) {
	const account = useAccountStore((s) => s.email);

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

	return useBaseLinkNote(linkType, updateFn);
}

function useLinkByContract(linkType: NoteLinkType) {
	const contract = useContract();
	const account = useAccountStore((s) => s.wallet);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId, noteId }) => {
			if (account?.characterId) {
				return contract.linkNote(
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

	return useBaseLinkNote(linkType, updateFn);
}

function useBaseLinkNote(linkType: NoteLinkType, updateFn: UpdateFn) {
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
