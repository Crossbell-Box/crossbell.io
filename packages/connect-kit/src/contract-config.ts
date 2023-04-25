import { ContractConfig } from "@crossbell/contract";
import { useAccountState } from "@crossbell/react-account";

import { showNoEnoughCSBModal } from "./modals/no-enough-csb-modal";
import { showUpgradeEmailAccountModal } from "./modals/upgrade-account-modal";
import { showConnectModal } from "./modals/connect-modal";
import { showWalletMintNewCharacterModal } from "./modals/wallet-mint-new-character";
import { showSwitchNetworkModal } from "./modals/switch-network-modal";

export const contractConfig: ContractConfig = {
	openConnectModal() {
		if (useAccountState.getState().email) {
			showUpgradeEmailAccountModal();
		} else {
			showConnectModal();
		}
	},

	openFaucetHintModel() {
		showNoEnoughCSBModal("claim-csb");
	},

	getCurrentCharacterId() {
		return useAccountState.getState().computed.account?.characterId ?? null;
	},

	openMintNewCharacterModel() {
		showWalletMintNewCharacterModal();
	},

	showSwitchNetworkModal,
};
