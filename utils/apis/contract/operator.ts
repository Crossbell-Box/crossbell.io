import { useContract } from "@/utils/crossbell.js";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OPERATOR_ADDRESS } from "@/utils/apis/operator-sync";

import { SCOPE_KEY_CHARACTER } from "../indexer";

export function useToggleSyncOperator(type: "add" | "remove") {
	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async (characterId: number) => {
			return type === "add"
				? contract.addOperator(characterId, OPERATOR_ADDRESS)
				: contract.removeOperator(characterId, OPERATOR_ADDRESS);
		},
		{
			onSuccess: (_, characterId) => {
				return Promise.all([
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTER(characterId)),
				]);
			},
			onError: (err: any) => {
				showNotification({
					title: "Error while setting operator",
					message: err.message,
					color: "red",
				});
			},
		}
	);
}
