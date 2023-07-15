import React from "react";
import { Contract } from "crossbell";
import { crossbell } from "wagmi/chains";

import { createLazyModal } from "../../components";
import { useSwitchNetworkModal } from "./stores";

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

export const SwitchNetworkModal = createLazyModal(
	useSwitchNetworkModal,
	React.lazy(() => import("./lazy")),
);
