import React from "react";
import { useConnectedAccount, useConnectModal } from "@crossbell/connect-kit";

import { useIsSupportedChain } from "./use-is-supported-chain";
import { useSwitchNetworkModal } from "./stores";

export function useAutoDisplaySwitchNetworkModal(isActive = true) {
	const { show } = useSwitchNetworkModal();
	const isWalletConnected = !!useConnectedAccount("wallet");
	const isConnectModalActive = useConnectModal((s) => s.isActive);
	const isSupportedChain = useIsSupportedChain();

	React.useEffect(() => {
		if (isConnectModalActive || !isActive) return;

		if (!isSupportedChain && isWalletConnected) {
			show();
		}
	}, [isSupportedChain, isConnectModalActive, isWalletConnected, isActive]);
}
