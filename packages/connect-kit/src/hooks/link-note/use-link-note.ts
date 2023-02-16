import { NoteLinkType } from "@crossbell/indexer";

import { linkNote, siweLinkNote } from "../../apis";
import {
	AccountTypeBasedMutationOptions,
	createAccountTypeBasedMutationHooks,
} from "../account-type-based-hooks";
import {
	revalidateQueries,
	updateLinkStatus,
	waitUntilLinkStatusUpdated,
} from "./utils";

export type UseLinkNoteOptions = AccountTypeBasedMutationOptions<
	typeof useLinkNote
>;

const action = "link";

export const useLinkNote = createAccountTypeBasedMutationHooks<
	NoteLinkType,
	{ characterId: number; noteId: number },
	boolean
>({ actionDesc: "", withParams: true }, (linkType) => ({
	async email({ characterId, noteId }, { account, queryClient }) {
		if (account) {
			const params = {
				toNoteId: noteId,
				toCharacterId: characterId,
				characterId: account.characterId,
				linkType,
			};

			const needUpdate = await updateLinkStatus(queryClient, action, params);

			if (needUpdate) {
				await linkNote({
					token: account.token,
					toCharacterId: characterId,
					toNoteId: noteId,
					linkType: linkType,
				});

				await waitUntilLinkStatusUpdated(action, params);
			}

			return true;
		} else {
			return false;
		}
	},

	async contract(
		{ characterId, noteId },
		{ account, siwe, contract, queryClient }
	) {
		if (account?.characterId) {
			const params = {
				toNoteId: noteId,
				toCharacterId: characterId,
				characterId: account.characterId,
				linkType,
			};

			if (siwe) {
				const needUpdate = await updateLinkStatus(queryClient, action, params);

				if (needUpdate) {
					await siweLinkNote({
						siwe,
						characterId: account.characterId,
						toCharacterId: characterId,
						toNoteId: noteId,
						linkType: linkType,
					});
				}
			} else {
				await contract.linkNote(
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
		const { noteId, characterId } = variables;

		if (account?.characterId) {
			await revalidateQueries(queryClient, {
				characterId: account?.characterId,
				toNoteId: noteId,
				toCharacterId: characterId,
				linkType,
			});
		}
	},
}));
