import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useChangeCharacterMetadata } from "../use-change-character-metadata";

import OperatorSyncApi from "./api";
import { SupportedPlatform } from "./consts";

const api = new OperatorSyncApi();

export { api as operatorSyncApi };

const SCOPE_KEY = ["api", "operator-sync"];
const csbAccountURI = (identity: string, platform: SupportedPlatform) =>
	`csb://account:${identity}@${platform}`;

// get character media usage

const SCOPE_KEY_CHARACTER_MEDIA_USAGE = (characterId: number) => {
	return [...SCOPE_KEY, "character-media-usage", characterId];
};
export function useCharacterMediaUsage(characterId?: number) {
	return useQuery(
		SCOPE_KEY_CHARACTER_MEDIA_USAGE(characterId!),
		() => api.getCharacterMediaUsage(characterId!),
		{
			enabled: Boolean(characterId),
		}
	);
}

// check if a character activate operator-sync

export const SCOPE_KEY_CHARACTER_ACTIVATION = (characterId: number) => {
	return [...SCOPE_KEY, "character-activate", characterId];
};
export function useCharacterActivation(characterId?: number) {
	return useQuery(
		SCOPE_KEY_CHARACTER_ACTIVATION(characterId!),
		() => api.isCharacterActivated(characterId!),
		{
			enabled: Boolean(characterId),
		}
	);
}

// activate a character

export function useActivateCharacter(characterId?: number) {
	const client = useQueryClient();
	return useMutation(() => api.activateCharacter(characterId!), {
		onSuccess: () => {
			return Promise.all([
				client.invalidateQueries(SCOPE_KEY_CHARACTER_ACTIVATION(characterId!)),
			]);
		},
	});
}

// get bound accounts

export const SCOPE_KEY_CHARACTER_BOUND_ACCOUNTS = (characterId: number) => {
	return [...SCOPE_KEY, "character-bound-accounts", characterId];
};
export function useCharacterBoundAccounts(characterId?: number) {
	return useQuery(
		SCOPE_KEY_CHARACTER_BOUND_ACCOUNTS(characterId!),
		() => api.getBoundAccounts(characterId!).then((res) => res.result ?? []),
		{
			enabled: Boolean(characterId),
		}
	);
}

// bind an account to a character

export type UseBindAccountParams = {
	characterId?: number;
	platform: SupportedPlatform;
	identity: string;
	/** in RFC 3339 format */
	startTime?: string;
};

export function useBindAccount({
	characterId,
	platform,
	identity,
	startTime,
}: UseBindAccountParams) {
	const client = useQueryClient();
	const changeCharacterMetadata = useChangeCharacterMetadata();

	return useMutation(
		async () => {
			if (!characterId) return;

			await changeCharacterMetadata((draft) => {
				const accountURI = csbAccountURI(identity, platform);

				if (!draft.connected_accounts?.includes(accountURI)) {
					draft.connected_accounts = [
						...(draft.connected_accounts ?? []),
						accountURI,
					];
				}
			});

			return api.bindAccount(characterId, platform, identity, startTime);
		},
		{
			onSuccess: () => {
				return Promise.all([
					client.invalidateQueries(
						SCOPE_KEY_CHARACTER_BOUND_ACCOUNTS(characterId!)
					),
				]);
			},
			onError: (err: any) => {
				showNotification({
					message: err.message,
					color: "red",
				});
			},
		}
	);
}

// unbind an account from a character

export type UseUnbindAccountParams = {
	characterId?: number;
	platform: SupportedPlatform;
	identity: string;
};

export function useUnbindAccount({
	characterId,
	platform,
	identity,
}: UseUnbindAccountParams) {
	const client = useQueryClient();
	const changeCharacterMetadata = useChangeCharacterMetadata();

	return useMutation(
		async () => {
			if (!characterId) return;

			await changeCharacterMetadata((draft) => {
				const accountURI = csbAccountURI(identity, platform);
				const index = draft.connected_accounts?.indexOf(accountURI) ?? -1;

				if (index > -1) {
					draft.connected_accounts?.splice(index, 1);
				}
			});

			return api.unbindAccount(characterId, platform!, identity);
		},
		{
			onSuccess: () => {
				return Promise.all([
					client.invalidateQueries(
						SCOPE_KEY_CHARACTER_BOUND_ACCOUNTS(characterId!)
					),
				]);
			},
			onError: (err: any) => {
				showNotification({
					message: err.message,
					color: "red",
				});
			},
		}
	);
}

// sync a account manually

export function useSyncAccount(
	characterId: number | undefined,
	platform: SupportedPlatform,
	identity: string
) {
	const client = useQueryClient();
	return useMutation(
		async () => {
			if (!characterId) return;

			return api.syncAccount(characterId, platform!, identity);
		},
		{
			onSuccess: () => {
				return Promise.all([
					client.invalidateQueries(
						SCOPE_KEY_CHARACTER_BOUND_ACCOUNTS(characterId!)
					),
				]);
			},
			onError: (err: any) => {
				showNotification({
					message: err.message,
					color: "red",
				});
			},
		}
	);
}
