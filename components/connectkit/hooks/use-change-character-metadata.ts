import { produce, Draft } from "immer";
import { CharacterMetadata } from "crossbell.js";

import { useContract } from "@/utils/crossbell.js";
import { useRefCallback } from "@/utils/hooks/use-ref-callback";
import { updateCharactersMetadata } from "@/components/connectkit/apis";

import { useAccountState } from "./account-state";

export function useChangeCharacterMetadata() {
	const contract = useContract();

	return useRefCallback(
		async (
			update: (metadata: Draft<CharacterMetadata>) => void
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
						return true;
					case "wallet":
						await contract.setCharacterMetadata(
							account.character.characterId,
							newMetadata
						);
						return true;
				}
			} catch (err) {
				console.error(err);
				return false;
			}
		}
	);
}
