import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { CharacterMetadata } from "crossbell.js";
import React from "react";

import { useContract } from "@crossbell/contract";
import { deepMerge } from "@crossbell/util-metadata";
import { SCOPE_KEY_CHARACTER } from "@crossbell/indexer";

import { updateMetadata } from "../apis";

import { useAccountState } from "./account-state";

type UpdateFn = (params: {
	characterId: number;
	metadata: CharacterMetadata;
}) => Promise<unknown>;

export function useUpdateCharacterMetadata() {
	const account = useAccountState((s) => s.computed.account);
	const updateByContract = useUpdateByContract();
	const updateByEmail = useUpdateByEmail();

	return account?.type === "email" ? updateByEmail : updateByContract;
}

function useUpdateByEmail() {
	const account = useAccountState((s) => s.email);
	const refreshEmail = useAccountState((s) => s.refreshEmail.bind(s));
	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId, metadata }) => {
			if (account?.characterId === characterId) {
				return updateMetadata(account?.token, metadata);
			} else {
				return false;
			}
		},
		[account]
	);

	return useUpdateMetadata(updateFn, refreshEmail);
}

function useUpdateByContract() {
	const contract = useContract();
	const updateFn: UpdateFn = React.useCallback(
		({ characterId, metadata }) =>
			contract.changeCharacterMetadata(characterId, (oMetadata) => {
				if (oMetadata) {
					return deepMerge(oMetadata, metadata);
				} else {
					return metadata;
				}
			}),
		[contract]
	);

	return useUpdateMetadata(updateFn);
}

function useUpdateMetadata(
	updateFn: UpdateFn,
	onSuccess?: () => Promise<unknown>
) {
	const queryClient = useQueryClient();

	return useMutation(
		async (params: Parameters<UpdateFn>[0]) => updateFn(params),
		{
			onSuccess(_, { characterId }) {
				return Promise.all([
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTER(characterId)),
					onSuccess?.(),
				]);
			},
			onError(err) {
				showNotification({
					title: "Error while setting character metadata",
					message: `${err}`,
					color: "red",
				});
			},
		}
	);
}
