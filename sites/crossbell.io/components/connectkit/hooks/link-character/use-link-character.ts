import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import React from "react";

import { useContract } from "@/utils/crossbell.js";
import { CharacterLinkType } from "@crossbell/indexer";

import { linkCharacter } from "../../apis";
import { useAccountState } from "../account-state";
type UpdateFn = (params: { characterId: number }) => Promise<unknown>;

export type LinkCharacterOptions = UseMutationOptions<
	unknown,
	unknown,
	Parameters<UpdateFn>[0]
>;

export function useLinkCharacter(
	linkType: CharacterLinkType,
	config: LinkCharacterOptions
) {
	const account = useAccountState((s) => s.computed.account);
	const linkByContract = useLinkByContract(linkType, config);
	const linkByEmail = useLinkByEmail(linkType, config);

	return account?.type === "email" ? linkByEmail : linkByContract;
}

function useLinkByEmail(
	linkType: CharacterLinkType,
	config: LinkCharacterOptions
) {
	const account = useAccountState((s) => s.email);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId }) => {
			if (account) {
				return linkCharacter({
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

	return useBaseLinkCharacter(linkType, updateFn, config);
}

function useLinkByContract(
	linkType: CharacterLinkType,
	config: LinkCharacterOptions
) {
	const contract = useContract();
	const account = useAccountState((s) => s.wallet);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterId }) => {
			if (account?.characterId) {
				return contract.linkCharacter(
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

	return useBaseLinkCharacter(linkType, updateFn, config);
}

function useBaseLinkCharacter(
	linkType: CharacterLinkType,
	updateFn: UpdateFn,
	config: LinkCharacterOptions
) {
	return useMutation((params: Parameters<UpdateFn>[0]) => updateFn(params), {
		...config,
		onError: (err, ...others) => {
			config.onError?.(err, ...others);

			showNotification({
				title: "Error while linking character",
				message: `${err}`,
				color: "red",
			});
		},
	});
}
