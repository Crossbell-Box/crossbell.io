import { useContract } from "@/utils/crossbell.js";
import { showNotification } from "@mantine/notifications";
import { CharacterMetadata } from "crossbell.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import {
	SCOPE_KEY_CHARACTER,
	SCOPE_KEY_CHARACTERS,
	SCOPE_KEY_CHARACTER_BY_HANDLE,
	SCOPE_KEY_PRIMARY_CHARACTER,
} from "../indexer";
import { deepMerge } from "@/utils/metadata";

// create new character

export function useCreateCharacter() {
	const { address } = useAccount();
	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async ({
			handle,
			metadata,
		}: {
			handle: string;
			metadata: CharacterMetadata;
		}) => {
			return contract.createCharacter(address!, handle, metadata);
		},
		{
			onSuccess: (data, { handle }) => {
				return Promise.all([
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTER(data.data)),
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTERS(address)),
					queryClient.invalidateQueries(SCOPE_KEY_PRIMARY_CHARACTER(address)),
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTER_BY_HANDLE(handle)),
				]);
			},
			onError: (err: any) => {
				showNotification({
					title: "Error while creating character",
					message: err.message,
					color: "red",
				});
			},
		}
	);
}

// set character metadata

export function useSetCharacterMetadata(characterId: number) {
	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async ({ metadata }: { metadata: CharacterMetadata }) => {
			return contract.changeCharacterMetadata(characterId, (oMetadata) => {
				if (oMetadata) {
					return deepMerge(oMetadata, metadata);
				}
				return metadata;
			});
		},
		{
			onSuccess: () => {
				return queryClient.invalidateQueries(SCOPE_KEY_CHARACTER(characterId));
			},
			onError: (err: any) => {
				showNotification({
					title: "Error while setting character metadata",
					message: err.message,
					color: "red",
				});
			},
		}
	);
}

// set handle

export function useSetCharacterHandle(characterId: number) {
	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async ({ handle }: { handle: string }) => {
			return contract.setHandle(characterId, handle);
		},
		{
			onSuccess: (data, { handle }) => {
				return Promise.all([
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTER(characterId)),
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTER_BY_HANDLE(handle)),
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

// set primary character

export function useSetPrimaryCharacterId(characterId: number) {
	const { address } = useAccount();

	const contract = useContract();
	const queryClient = useQueryClient();

	return useMutation(
		async () => {
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
