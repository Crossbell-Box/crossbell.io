import { useCallback } from "react";
import { useAccount } from "wagmi";

import { openMintNewCharacterModel } from "@/components/common/NewUserGuide";
import { useAccountCharacter, useConnectKit } from "@/components/connectkit";

export function useLoginChecker() {
	const { address, isConnected } = useAccount();
	const { data: character } = useAccountCharacter();
	const { modal } = useConnectKit();

	const characterId = character?.characterId;
	const hasCharacter = Boolean(characterId);

	const validate = useCallback(() => {
		if (!isConnected) {
			modal.show();
			return false;
		}

		if (!hasCharacter) {
			openMintNewCharacterModel();
			return false;
		}

		return true;
	}, [isConnected, hasCharacter, modal]);

	return {
		address,
		isConnected,
		hasCharacter,
		currentCharacterId: characterId,
		validate,
	};
}
