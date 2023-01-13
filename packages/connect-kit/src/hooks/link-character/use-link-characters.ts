import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import React from "react";

import { useContract } from "@crossbell/contract";
import { CharacterLinkType } from "@crossbell/indexer";

import { linkCharacters } from "../../apis";
import { useAccountState } from "../account-state";

type UpdateFn = (params: {
	characterIds?: number[];
	addresses?: string[];
}) => Promise<unknown>;

export type LinkCharactersOptions = UseMutationOptions<
	unknown,
	unknown,
	Parameters<UpdateFn>[0]
>;

export function useLinkCharacters(
	linkType: CharacterLinkType,
	config: LinkCharactersOptions
) {
	const account = useAccountState((s) => s.computed.account);
	const linkByContract = useLinkByContract(linkType, config);
	const linkByEmail = useLinkByEmail(linkType, config);

	return account?.type === "email" ? linkByEmail : linkByContract;
}

function useLinkByEmail(
	linkType: CharacterLinkType,
	config: LinkCharactersOptions
) {
	const account = useAccountState((s) => s.email);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterIds, addresses }) => {
			if (account) {
				return linkCharacters({
					token: account.token,
					toCharacterIds: characterIds ?? [],
					toAddresses: addresses ?? [],
					linkType,
				});
			} else {
				return false;
			}
		},
		[account, linkType]
	);

	return useBaseLinkCharacter(updateFn, config);
}

function useLinkByContract(
	linkType: CharacterLinkType,
	config: LinkCharactersOptions
) {
	const contract = useContract();
	const account = useAccountState((s) => s.wallet);

	const updateFn: UpdateFn = React.useCallback(
		async ({ characterIds, addresses }) => {
			if (account?.characterId) {
				return contract.linkCharactersInBatch(
					account.characterId,
					characterIds ?? [],
					addresses ?? [],
					linkType
				);
			} else {
				return false;
			}
		},
		[account, contract, linkType]
	);

	return useBaseLinkCharacter(updateFn, config);
}

function useBaseLinkCharacter(
	updateFn: UpdateFn,
	config: LinkCharactersOptions
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
