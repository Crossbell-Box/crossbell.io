import { openMintNewCharacterModel } from "@/components/common/NewUserGuide";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useCallback } from "react";
import { useAccount } from "wagmi";
import { useCurrentCharacter } from "../apis/indexer";

export function useLoginChecker() {
	const { address, isConnected } = useAccount();
	const { characterId } = useCurrentCharacter();
	const { openConnectModal } = useConnectModal();

	const hasCharacter = Boolean(characterId);

	const validate = useCallback(() => {
		if (!isConnected) {
			openConnectModal?.();
			return false;
		}

		if (!hasCharacter) {
			openMintNewCharacterModel();
			return false;
		}

		return true;
	}, [address, isConnected, characterId]);

	return {
		address,
		isConnected,
		hasCharacter,
		currentCharacterId: characterId,
		validate,
	};
}
