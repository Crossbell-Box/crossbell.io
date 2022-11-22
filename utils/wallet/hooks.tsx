import React from "react";

import { openMintNewCharacterModel } from "@/components/common/NewUserGuide";
import { useAccountStore, useConnectModal } from "@/components/connectkit";

export function useLoginChecker() {
	const account = useAccountStore((s) => s.computed.account);
	const connectModal = useConnectModal();

	return React.useMemo(
		() => ({
			validate() {
				switch (account?.type) {
					case "email":
						return true;
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
		[connectModal, account]
	);
}
