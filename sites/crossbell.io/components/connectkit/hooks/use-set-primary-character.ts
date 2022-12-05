import { useAccount } from "wagmi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";

import { useContract } from "@/utils/crossbell.js";
import {
	SCOPE_KEY_CHARACTERS,
	SCOPE_KEY_PRIMARY_CHARACTER,
} from "@crossbell/indexer";

export function useSetPrimaryCharacter() {
	const { address } = useAccount();

	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async ({ characterId }: { characterId: number }) => {
			return contract.setPrimaryCharacterId(characterId);
		},
		{
			onSuccess: () => {
				return Promise.all([
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTERS(address)),
					queryClient.invalidateQueries(SCOPE_KEY_PRIMARY_CHARACTER(address)),
				]);
			},
			onError: (err: any) => {
				showNotification({
					title: "Error while setting primary character",
					message: err.message,
					color: "red",
				});
			},
		}
	);
}
