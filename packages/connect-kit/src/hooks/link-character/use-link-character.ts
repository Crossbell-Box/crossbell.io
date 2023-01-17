import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import React from "react";

import { useContract } from "@crossbell/contract";
import { CharacterLinkType } from "@crossbell/indexer";

import { linkCharacter, siweLinkCharacter } from "../../apis";
import { useAccountState } from "../account-state";
import { useHandleError } from "../use-handle-error";

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

	return useBaseLinkCharacter(updateFn, config);
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
				if (account.siwe) {
					return siweLinkCharacter({
						characterId: account.characterId,
						token: account.siwe.token,
						toCharacterId: characterId,
						linkType,
					});
				} else {
					return contract.linkCharacter(
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

	return useBaseLinkCharacter(updateFn, config);
}

function useBaseLinkCharacter(
	updateFn: UpdateFn,
	config: LinkCharacterOptions
) {
	const handleError = useHandleError("Error while linking character");

	return useMutation((params: Parameters<UpdateFn>[0]) => updateFn(params), {
		...config,
		onError: (...params) => {
			config.onError?.(...params);
			handleError(params[0]);
		},
	});
}
