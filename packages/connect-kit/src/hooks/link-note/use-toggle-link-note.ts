import { NoteLinkType } from "@crossbell/indexer";
import { useDebouncedActionSequence } from "@crossbell/util-hooks";

import { linkNote, unlinkNote, siweUnlinkNote, siweLinkNote } from "../../apis";
import { useHandleError } from "../use-handle-error";
import {
	AccountTypeBasedMutationOptions,
	createAccountTypeBasedMutationHooks,
} from "../account-type-based-hooks";
import {
	revalidateQueries,
	updateLinkStatus,
	waitUntilLinkStatusUpdated,
	Action,
} from "./utils";

export type UseToggleLinkNoteOptions = AccountTypeBasedMutationOptions<
	typeof useToggleLinkNote
>;

export type UseToggleLinkNoteVariable = {
	characterId: number;
	noteId: number;
	action?: Action;
};

const emailActionFn = (
	action: Action,
	params: Parameters<typeof linkNote>[0]
) => {
	switch (action) {
		case "link":
			return linkNote(params);
		case "unlink":
			return unlinkNote(params);
	}
};

const siweActionFn = (
	action: Action,
	params: Parameters<typeof siweLinkNote>[0]
) => {
	switch (action) {
		case "link":
			return siweLinkNote(params);
		case "unlink":
			return siweUnlinkNote(params);
	}
};

const actionDesc = "toggle like note";

const getLinkActionParams = (
	characterId: number,
	linkType: NoteLinkType,
	variable: UseToggleLinkNoteVariable
) => ({
	linkType,
	characterId,
	toNoteId: variable.noteId,
	toCharacterId: variable.characterId,
});

export const useToggleLinkNote = createAccountTypeBasedMutationHooks<
	NoteLinkType,
	UseToggleLinkNoteVariable
>({ actionDesc, withParams: true }, (linkType) => {
	const onError = useHandleError(actionDesc);
	const actionSequence = useDebouncedActionSequence({ onError });

	return {
		async email(variable, { account: { characterId, token }, queryClient }) {
			actionSequence.clear();

			const params = getLinkActionParams(characterId, linkType, variable);

			const status = await updateLinkStatus({
				queryClient,
				params,
				action: variable.action,
			});

			if (status.needUpdate) {
				actionSequence.add(
					async () => {
						await emailActionFn(status.action, { token, ...params });
						await waitUntilLinkStatusUpdated(status.action, params);
					},
					{ onSettled: () => revalidateQueries(queryClient, params) }
				);
			}
		},

		async contract(variable, { account, siwe, contract, queryClient }) {
			actionSequence.clear();

			const characterId = account?.characterId;

			if (characterId) {
				const params = getLinkActionParams(characterId, linkType, variable);

				const status = await updateLinkStatus({
					queryClient,
					params,
					action: variable.action,
					noOptimisticallyUpdate: !siwe,
				});

				if (status.needUpdate) {
					if (siwe) {
						actionSequence.add(
							async () => {
								await siweActionFn(status.action, { siwe, ...params });
								await waitUntilLinkStatusUpdated(status.action, params);
							},
							{ onSettled: () => revalidateQueries(queryClient, params) }
						);
					} else {
						await contract.linkNote(
							characterId,
							variable.characterId,
							variable.noteId,
							linkType
						);

						await waitUntilLinkStatusUpdated(status.action, params);
						await revalidateQueries(queryClient, params);
					}
				}
			}
		},
	};
});
