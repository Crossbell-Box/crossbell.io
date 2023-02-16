import { NoteLinkType } from "@crossbell/indexer";

import { unlinkNote, siweUnlinkNote } from "../../apis";
import {
	createAccountTypeBasedMutationHooks,
	AccountTypeBasedMutationOptions,
} from "../account-type-based-hooks";
import {
	revalidateQueries,
	updateLinkStatus,
	waitUntilLinkStatusUpdated,
} from "./utils";

export type UseUnlinkNoteOptions = AccountTypeBasedMutationOptions<
	typeof useUnlinkNote
>;

const action = "unlink";

export const useUnlinkNote = createAccountTypeBasedMutationHooks<
	NoteLinkType,
	{ characterId: number; noteId: number },
	boolean
>(
	{
		actionDesc: "unlinking note",
		withParams: true,
	},
	(linkType) => ({
		async email({ characterId, noteId }, { account, queryClient }) {
			const params = {
				toNoteId: noteId,
				toCharacterId: characterId,
				characterId: account.characterId,
				linkType,
			};

			const needUpdate = await updateLinkStatus(queryClient, action, params);

			if (needUpdate) {
				await unlinkNote({
					token: account.token,
					toCharacterId: characterId,
					toNoteId: noteId,
					linkType: linkType,
				});

				await waitUntilLinkStatusUpdated(action, params);
			}

			return true;
		},

		async contract(
			{ noteId, characterId },
			{ account, siwe, contract, queryClient }
		) {
			if (account.characterId) {
				const params = {
					toNoteId: noteId,
					toCharacterId: characterId,
					characterId: account.characterId,
					linkType,
				};

				if (siwe) {
					const needUpdate = await updateLinkStatus(
						queryClient,
						action,
						params
					);

					if (needUpdate) {
						await siweUnlinkNote({
							siwe,
							characterId: account.characterId,
							toCharacterId: characterId,
							toNoteId: noteId,
							linkType: linkType,
						});
					}
				} else {
					await contract.unlinkNote(
						account.characterId,
						characterId,
						noteId,
						linkType
					);
				}

				await waitUntilLinkStatusUpdated(action, params);

				return true;
			} else {
				return false;
			}
		},

		async onSettled({ variables, queryClient, account }) {
			const { characterId, noteId } = variables;

			if (account?.characterId) {
				await revalidateQueries(queryClient, {
					characterId: account?.characterId,
					toNoteId: noteId,
					toCharacterId: characterId,
					linkType,
				});
			}
		},
	})
);
