import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import React from "react";

import { useContract } from "@crossbell/contract";
import { CharacterLinkType } from "@crossbell/indexer";

import { linkCharacters, siweLinkCharacters } from "../../apis";
import { useAccountState } from "../account-state";
import { useHandleError } from "../use-handle-error";

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
				if (account.siwe) {
					return siweLinkCharacters({
						characterId: account.characterId,
						token: account.siwe.token,
						toCharacterIds: characterIds ?? [],
						toAddresses: addresses ?? [],
						linkType,
					});
				} else {
					return contract.linkCharactersInBatch(
						account.characterId,
						characterIds ?? [],
						addresses ?? [],
						linkType
					);
				}
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
	const handleError = useHandleError("Error while linking characters");
	return useMutation((params: Parameters<UpdateFn>[0]) => updateFn(params), {
		...config,
		onError: (...params) => {
			config.onError?.(...params);
			handleError(params[0]);
		},
	});
}
