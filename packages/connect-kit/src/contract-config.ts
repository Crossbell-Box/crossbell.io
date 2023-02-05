import { ContractConfig } from "@crossbell/contract";

import { useAccountState } from "./hooks";
import { useNoEnoughCSBModal } from "./modals/no-enough-csb-modal";
import { useUpgradeAccountModal } from "./modals/upgrade-account-modal";
import { useConnectModal } from "./modals/connect-modal";

export const contractConfig: Omit<ContractConfig, "openMintNewCharacterModel"> =
	{
		openConnectModal() {
			if (useAccountState.getState().email) {
				useUpgradeAccountModal.getState().show();
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
	};
