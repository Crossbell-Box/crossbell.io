import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { useContract } from "@/utils/crossbell.js";
import { useAccountStore } from "@/components/connectkit";

import { addOperator } from "../../apis";

import { SCOPE_KEY_CHARACTER_OPERATOR } from "./const";

type UpdateFn = (params: {
	characterId: number;
	operator: string;
}) => Promise<unknown>;

export function useAddCharacterOperator() {
	const account = useAccountStore((s) => s.computed.account);
	const addByContract = useAddOperatorByContract();
	const addByEmail = useAddOperatorByEmail();

	return account?.type === "email" ? addByEmail : addByContract;
}

function useAddOperatorByEmail() {
	const account = useAccountStore((s) => s.email);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId, operator }) => {
			if (account?.characterId === characterId) {
				return addOperator({ token: account.token, operator });
			} else {
				return null;
			}
		},
		[account]
	);

	return useAddOperator(updateFn);
}

function useAddOperatorByContract() {
	const contract = useContract();

	return useAddOperator(({ characterId, operator }) =>
		contract.addOperator(characterId, operator)
	);
}

function useAddOperator(updadeFn: UpdateFn) {
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
				title: "Error while adding operator",
				message: `${err}`,
				color: "red",
			});
		},
	});
}
