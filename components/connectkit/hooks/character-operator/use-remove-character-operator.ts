import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { useContract } from "@/utils/crossbell.js";
import { useAccountState } from "@/components/connectkit";

import { removeOperator } from "../../apis";

import { SCOPE_KEY_CHARACTER_OPERATOR } from "./const";

type UpdateFn = (params: {
	characterId: number;
	operator: string;
}) => Promise<unknown>;

export function useRemoveCharacterOperator() {
	const account = useAccountState((s) => s.computed.account);
	const removeByContract = useRemoveOperatorByContract();
	const removeByEmail = useRemoveOperatorByEmail();

	return account?.type === "email" ? removeByEmail : removeByContract;
}

function useRemoveOperatorByEmail() {
	const account = useAccountState((s) => s.email);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId, operator }) => {
			if (account?.characterId === characterId) {
				return removeOperator({ token: account.token, operator });
			} else {
				return null;
			}
		},
		[account]
	);

	return useRemoveOperator(updateFn);
}

function useRemoveOperatorByContract() {
	const contract = useContract();

	return useRemoveOperator(({ characterId, operator }) =>
		contract.addOperator(characterId, operator)
	);
}

function useRemoveOperator(updadeFn: UpdateFn) {
	const queryClient = useQueryClient();

	return useMutation((params: Parameters<UpdateFn>[0]) => updadeFn(params), {
		onSuccess: (_, { characterId }) => {
			return Promise.all([
				queryClient.invalidateQueries(
					SCOPE_KEY_CHARACTER_OPERATOR(characterId)
				),
			]);
		},
		onError: (err) => {
			showNotification({
				title: "Error while removing operator",
				message: `${err}`,
				color: "red",
			});
		},
	});
}