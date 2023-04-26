import React from "react";
import { ContractConfig } from "@crossbell/contract";
import { useAccountState } from "@crossbell/react-account";
import { useAccount } from "wagmi";

import { showNoEnoughCSBModal } from "./modals/no-enough-csb-modal";
import { showUpgradeEmailAccountModal } from "./modals/upgrade-account-modal";
import { showConnectModal } from "./modals/connect-modal";
import { showWalletMintNewCharacterModal } from "./modals/wallet-mint-new-character";
import { showSwitchNetworkModal } from "./modals/switch-network-modal";

export const useContractConfig = () => {
	const { address, connector } = useAccount();
	const [provider, setProvider] = React.useState<ContractConfig["provider"]>();

	React.useEffect(() => {
		connector?.getProvider().then(setProvider);
	}, [connector]);

	return React.useMemo(
		(): ContractConfig => ({
			address,

			provider,

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
		}),
		[address, provider]
	);
};
