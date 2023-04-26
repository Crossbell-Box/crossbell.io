import { setupModal } from "@crossbell/react-account/modal-config";

import { showClaimCSBTipsModal } from "./modals/claim-csb-tips-modal";
import { showNoEnoughCSBModal } from "./modals/no-enough-csb-modal";
import { showConnectModal } from "./modals/connect-modal";
import { showUpgradeEmailAccountModal } from "./modals/upgrade-account-modal";
import { showWalletMintNewCharacterModal } from "./modals/wallet-mint-new-character";

export const setupReactAccount = () => {
	setupModal({
		showClaimCSBTipsModal,

		showNoEnoughCSBModal,

		showConnectModal,

		showUpgradeEmailAccountModal,

		showWalletMintNewCharacterModal,
	});
};
