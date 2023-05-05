import React from "react";
import { Contract } from "crossbell.js";

import { BaseModal } from "../../components";
import { Main } from "./scenes/main";
import { useSwitchNetworkModal } from "./stores";
import { crossbell } from "wagmi/chains";

export * from "./use-auto-display-switch-network-modal";
export { useSwitchNetworkModal };

export function showSwitchNetworkModal(contract: Contract) {
	return new Promise<void>((resolve, reject) => {
		useSwitchNetworkModal.getState().show();

		const dispose = useSwitchNetworkModal.subscribe(({ isActive }) => {
			if (!isActive) {
				dispose();
				contract.walletClient!.getChainId().then((chainId) => {
					if (chainId === crossbell.id) {
						resolve();
					} else {
						reject(`Wrong Network: ${chainId}`);
					}
				});
			}
		});
	});
}

export function SwitchNetworkModal() {
	const { isActive } = useSwitchNetworkModal();

	return (
		<BaseModal isActive={isActive}>
			<Main />
		</BaseModal>
	);
}
