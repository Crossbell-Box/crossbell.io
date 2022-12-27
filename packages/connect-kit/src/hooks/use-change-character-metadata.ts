import { produce, Draft } from "immer";
import { CharacterMetadata } from "crossbell.js";

import { useContract } from "@crossbell/contract";
import { useRefCallback } from "@crossbell/util-hooks";

import { updateCharactersMetadata } from "../apis";
import { useAccountState } from "./account-state";

export function useChangeCharacterMetadata() {
	const contract = useContract();

	return useRefCallback(
		async (
			update: (draft: Draft<CharacterMetadata>) => void
		): Promise<boolean> => {
			// Make sure character metadata is up-to-date.
			await useAccountState.getState().refresh();
			const account = useAccountState.getState().computed.account;

			if (!account?.character) return false;

			const oldMetadata = account.character.metadata?.content ?? {};
			const newMetadata = produce(oldMetadata, update);

			// Skips redundant requests and just return success status directly.
			if (oldMetadata === newMetadata) return true;

			try {
				switch (account.type) {
					case "email":
						await updateCharactersMetadata({
							token: account.token,
							metadata: newMetadata,
						});
						await useAccountState.getState().refresh();
						return true;
					case "wallet":
						await contract.setCharacterMetadata(
							account.character.characterId,
							// crossbell.js will try to modify the object internally,
							// here the immutable object is converted to mutable object to avoid errors.
							JSON.parse(JSON.stringify(newMetadata))
						);
						await useAccountState.getState().refresh();
						return true;
				}
			} catch (err) {
				console.error(err);
				return false;
			}
		}
	);
}
