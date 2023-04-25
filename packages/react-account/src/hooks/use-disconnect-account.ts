import React from "react";
import { useDisconnect } from "wagmi";

import { useRefCallback } from "@crossbell/util-hooks";

import { useAccountState } from "./account-state";

export function useDisconnectAccount(afterDisconnect_?: () => void) {
	const { disconnect } = useDisconnect();
	const [disconnectEmail, disconnectWallet] = useAccountState((s) => [
		s.disconnectEmail,
		s.disconnectWallet,
	]);
	const afterDisconnect = useRefCallback(afterDisconnect_);

	return React.useCallback(() => {
		disconnect();
		disconnectWallet();
		disconnectEmail();
		afterDisconnect();
	}, [disconnectWallet, disconnectEmail, afterDisconnect]);
}
