import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { useContract } from "@crossbell/contract";

import { removeOperator } from "../../apis";
import { useAccountState } from "../account-state";
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
		contract.removeOperator(characterId, operator)
	);
}

function useRemoveOperator(updateFn: UpdateFn) {
	const queryClient = useQueryClient();

	return useMutation((params: Parameters<UpdateFn>[0]) => updateFn(params), {
		onSuccess: (_, { characterId }) => {
			return Promise.all([
				useAccountState.getState().refresh(),
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
