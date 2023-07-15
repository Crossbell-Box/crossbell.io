import React from "react";

import { createLazyModal } from "../../components";
import { waitUntilModalClosed } from "../../utils";

import { useWalletMintNewCharacterModal } from "./stores";

export { useWalletMintNewCharacterModal };

export function showWalletMintNewCharacterModal() {
	useWalletMintNewCharacterModal.getState().show();
	return waitUntilModalClosed(useWalletMintNewCharacterModal);
}

export const WalletMintNewCharacter = createLazyModal(
	useWalletMintNewCharacterModal,
	React.lazy(() => import("./lazy")),
);
