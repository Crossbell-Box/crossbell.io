import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import React from "react";

import { useContract } from "@crossbell/contract";
import { CharacterLinkType } from "@crossbell/indexer";

import { unlinkCharacter, siweUnlinkCharacter } from "../../apis";
import { useAccountState } from "../account-state";

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
	const account = useAccountState((s) => s.computed.account);
	const unlinkByContract = useUnlinkByContract(linkType, options);
	const unlinkByEmail = useUnlinkByEmail(linkType, options);

	return account?.type === "email" ? unlinkByEmail : unlinkByContract;
}

function useUnlinkByEmail(
	linkType: CharacterLinkType,
	options: UnlinkCharacterOptions
) {
	const account = useAccountState((s) => s.email);

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

	return useBaseUnlinkNote(updateFn, options);
}

function useUnlinkByContract(
	linkType: CharacterLinkType,
	options: UnlinkCharacterOptions
) {
	const contract = useContract();
	const account = useAccountState((s) => s.wallet);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId }) => {
			if (account?.characterId) {
				if (account.siwe) {
					return siweUnlinkCharacter({
						characterId: account.characterId,
						token: account.siwe.token,
						toCharacterId: characterId,
						linkType,
					});
				} else {
					return contract.unlinkCharacter(
						account.characterId,
						characterId,
						linkType
					);
				}
			} else {
				return false;
			}
		},
		[account, contract, linkType]
	);

	return useBaseUnlinkNote(updateFn, options);
}

function useBaseUnlinkNote(
	updateFn: UpdateFn,
	options: UnlinkCharacterOptions
) {
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
