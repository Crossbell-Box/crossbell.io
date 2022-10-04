import { useContract } from "@/utils/crossbell.js";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SCOPE_KEY_CHARACTER_OPERATOR } from "../indexer";

export function useSetCharacterOperator(operator: string) {
	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async (characterId: number) => {
			return contract.setOperator(characterId, operator);
		},
		{
			onSuccess: (_, characterId) => {
				return Promise.all([
					queryClient.invalidateQueries(
						SCOPE_KEY_CHARACTER_OPERATOR(characterId)
					),
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
