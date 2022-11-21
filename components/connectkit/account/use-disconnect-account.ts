import React from "react";
import { useDisconnect } from "wagmi";

import { useAccountStore } from "./account-store";

export function useDisconnectAccount() {
	const { disconnect: disconnectWallet } = useDisconnect();
	const disconnectEmail = useAccountStore((s) => s.disconnectEmail);

	return React.useCallback(() => {
		disconnectWallet();
		disconnectEmail();
	}, [disconnectWallet, disconnectEmail]);
}
