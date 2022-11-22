import React from "react";

import { openMintNewCharacterModel } from "@/components/common/NewUserGuide";
import { useAccountStore, useConnectKit } from "@/components/connectkit";

export function useLoginChecker() {
	const account = useAccountStore((s) => s.computed.account);
	const { modal } = useConnectKit();

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

				modal.show();
				return false;
			},
		}),
		[modal, account]
	);
}
