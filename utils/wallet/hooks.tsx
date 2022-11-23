import React from "react";

import { openMintNewCharacterModel } from "@/components/common/NewUserGuide";
import {
	useAccountStore,
	useConnectModal,
	useUpgradeAccountModal,
} from "@/components/connectkit";

export function useLoginChecker() {
	const account = useAccountStore((s) => s.computed.account);
	const connectModal = useConnectModal();
	const upgradeAccountModal = useUpgradeAccountModal();

	return React.useMemo(
		() => ({
			validate({ walletRequired }: { walletRequired?: boolean } = {}) {
				switch (account?.type) {
					case "email":
						if (walletRequired) {
							upgradeAccountModal.show();
							return false;
						} else {
							return true;
						}
					case "wallet":
						if (account.characterId) {
							return true;
						} else {
							openMintNewCharacterModel();
							return false;
						}
				}

				connectModal.show();
				return false;
			},
		}),
		[account, connectModal, upgradeAccountModal]
	);
}
