import { NoteMetadata } from "crossbell";
import { SCOPE_KEY_FOLLOWING_FEEDS_OF_CHARACTER } from "@crossbell/indexer";

import { putNote, siwePutNote } from "../apis";

import { createAccountTypeBasedMutationHooks } from "./account-type-based-hooks";

export const usePostNote = createAccountTypeBasedMutationHooks<
	void,
	{ metadata: NoteMetadata }
>(
	{
		actionDesc: "",
		withParams: false,
	},
	() => ({
		async email({ metadata }, { account }) {
			await putNote({ token: account.token, metadata });
		},

		wallet: {
			supportOPSign: true,

			async action({ metadata }, { account, siwe, contract }) {
				const characterId = account?.characterId;

				if (characterId) {
					if (siwe) {
						await siwePutNote({ siwe, characterId, metadata });
					} else {
						await contract.note.post(characterId, metadata);
					}
				}
			},
		},

		onSuccess({ queryClient, account }) {
			return Promise.all([
				queryClient.invalidateQueries(
					SCOPE_KEY_FOLLOWING_FEEDS_OF_CHARACTER(account?.characterId)
				),
			]);
		},
	})
);
