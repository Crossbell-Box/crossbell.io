import { NoteMetadata } from "crossbell";
import { SCOPE_KEY_FOLLOWING_FEEDS_OF_CHARACTER } from "@crossbell/indexer";

import { putNote, siwePutNote } from "../apis";

import { createAccountTypeBasedMutationHooks } from "./account-type-based-hooks";

export const usePostNote = createAccountTypeBasedMutationHooks<
	void,
	{ metadata: NoteMetadata; characterId?: number },
	{ noteId: bigint }
>(
	{
		actionDesc: "usePostNote",
		withParams: false,
	},
	() => ({
		async email({ metadata, characterId }, { account }) {
			if (characterId && account.characterId !== characterId) {
				throw new Error(
					"Email user cannot use any characterId other than their own."
				);
			}

			const { data } = await putNote({ token: account.token, metadata });

			return { noteId: BigInt(data.noteId) };
		},

		wallet: {
			supportOPSign: true,

			async action(
				{ metadata, characterId: specifiedCharacterId },
				{ account, siwe, contract }
			) {
				const characterId = specifiedCharacterId ?? account.characterId!;

				const canUseSiwe = specifiedCharacterId
					? // TODO: Check if the specified characterId belongs to the current wallet, not just the one currently in use.
					  specifiedCharacterId === account?.characterId
					: true;

				if (siwe && canUseSiwe) {
					const { data } = await siwePutNote({ siwe, characterId, metadata });

					return { noteId: BigInt(data.noteId) };
				} else {
					const { data } = await contract.note.post({
						characterId,
						metadataOrUri: metadata,
					});

					return { noteId: data.noteId };
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
