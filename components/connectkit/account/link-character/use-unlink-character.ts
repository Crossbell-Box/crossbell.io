import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import React from "react";

import { useContract } from "@/utils/crossbell.js";
import { CharacterLinkType } from "@/utils/apis/indexer";

import { unlinkCharacter } from "../../apis";
import { useAccountStore } from "../account-store";

type UpdateFn = (params: { characterId: number }) => Promise<unknown>;

export type UnlinkCharacterOptions = UseMutationOptions<
	unknown,
	unknown,
	Parameters<UpdateFn>[0]
>;

export function useUnlinkCharacter(
	linkType: CharacterLinkType,
	options: UnlinkCharacterOptions
) {
	const account = useAccountStore((s) => s.computed.account);
	const unlinkByContract = useUnlinkByContract(linkType, options);
	const unlinkByEmail = useUnlinkByEmail(linkType, options);

	return account?.type === "email" ? unlinkByEmail : unlinkByContract;
}

function useUnlinkByEmail(
	linkType: CharacterLinkType,
	options: UnlinkCharacterOptions
) {
	const account = useAccountStore((s) => s.email);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId }) => {
			if (account) {
				return unlinkCharacter({
					token: account.token,
					toCharacterId: characterId,
					linkType,
				});
			} else {
				return false;
			}
		},
		[account, linkType]
	);

	return useBaseUnlinkNote(linkType, updateFn, options);
}

function useUnlinkByContract(
	linkType: CharacterLinkType,
	options: UnlinkCharacterOptions
) {
	const contract = useContract();
	const account = useAccountStore((s) => s.wallet);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId }) => {
			if (account?.characterId) {
				return contract.unlinkCharacter(
					account.characterId,
					characterId,
					linkType
				);
			} else {
				return false;
			}
		},
		[account, contract, linkType]
	);

	return useBaseUnlinkNote(linkType, updateFn, options);
}

function useBaseUnlinkNote(
	linkType: CharacterLinkType,
	updateFn: UpdateFn,
	options: UnlinkCharacterOptions
) {
	const queryClient = useQueryClient();

	return useMutation((params: Parameters<UpdateFn>[0]) => updateFn(params), {
		...options,
		onError: (err, ...others) => {
			options.onError?.(err, ...others);

			showNotification({
				title: "Error while linking character",
				message: `${err}`,
				color: "red",
			});
		},
	});
}