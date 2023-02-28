import { ContractConfig } from "@crossbell/contract";

import { useAccountState } from "./hooks";
import { useNoEnoughCSBModal } from "./modals/no-enough-csb-modal";
import { showUpgradeAccountModal } from "./modals/upgrade-account-modal";
import { useConnectModal } from "./modals/connect-modal";
import { useWalletMintNewCharacterModal } from "./modals/wallet-mint-new-character";

export const contractConfig: ContractConfig = {
	openConnectModal() {
		if (useAccountState.getState().email) {
			showUpgradeAccountModal();
		} else {
			useConnectModal.getState().show();
		}
	},

	openFaucetHintModel() {
		useNoEnoughCSBModal.getState().show("claim-csb");
	},

	getCurrentCharacterId() {
		return useAccountState.getState().computed.account?.characterId ?? null;
	},

	openMintNewCharacterModel() {
		useWalletMintNewCharacterModal.getState().show();
	},
};
