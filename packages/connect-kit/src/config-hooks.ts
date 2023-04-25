import { configHooks as config } from "./hooks/hooks-config";

import { showClaimCSBTipsModal } from "./modals/claim-csb-tips-modal";
import { showNoEnoughCSBModal } from "./modals/no-enough-csb-modal";
import { showConnectModal } from "./modals/connect-modal";
import { showUpgradeEmailAccountModal } from "./modals/upgrade-account-modal";
import { showWalletMintNewCharacterModal } from "./modals/wallet-mint-new-character";

export const configHooks = () =>
	config({
		showClaimCSBTipsModal,

		showNoEnoughCSBModal,

		showConnectModal,

		showUpgradeEmailAccountModal,

		showWalletMintNewCharacterModal,
	});
