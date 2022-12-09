import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

import {
	SCOPE_KEY_CHARACTER,
	SCOPE_KEY_CHARACTER_BY_HANDLE,
} from "@/utils/apis/indexer";
import { useContract } from "@/utils/crossbell.js";

import { updateHandle } from "../apis";

import { useAccountState } from "./account-state";

type UpdateFn = (params: {
	characterId: number;
	handle: string;
}) => Promise<unknown>;

export function useUpdateCharacterHandle() {
	const account = useAccountState((s) => s.computed.account);
	const updateByContract = useUpdateByContract();
	const updateByEmail = useUpdateByEmail();

	return account?.type === "email" ? updateByEmail : updateByContract;
}

function useUpdateByEmail() {
	const account = useAccountState((s) => s.email);
	const refreshEmail = useAccountState((s) => s.refreshEmail.bind(s));
	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId, handle }) => {
			if (account?.characterId === characterId) {
				return updateHandle(account?.token, handle);
			} else {
				return false;
			}
		},
		[account]
	);

	return useUpdateHandle(updateFn, refreshEmail);
}

function useUpdateByContract() {
	const contract = useContract();
	const updateFn: UpdateFn = React.useCallback(
		({ characterId, handle }) => contract.setHandle(characterId, handle),
		[contract]
	);

	return useUpdateHandle(updateFn);
}

function useUpdateHandle(
	updateFn: UpdateFn,
	onSuccess?: () => Promise<unknown>
) {
	const queryClient = useQueryClient();

	return useMutation(
		async (params: Parameters<UpdateFn>[0]) => updateFn(params),
		{
			onSuccess: (data, { handle, characterId }) => {
				return Promise.all([
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTER(characterId)),
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTER_BY_HANDLE(handle)),
					onSuccess?.(),
				]);
			},
			onError: (err: any) => {
				showNotification({
					title: "Error while setting character handle",
					message: err.message,
					color: "red",
				});
			},
		}
	);
}
