import React from "react";

import { useRefCallback } from "@crossbell/util-hooks";

import { useContext } from "../context";
import { useAccountState } from "./account-state";

export function useDisconnectAccount(afterDisconnect_?: () => void) {
	const { onDisconnect } = useContext();
	const [disconnectEmail, disconnectWallet] = useAccountState((s) => [
		s.disconnectEmail,
		s.disconnectWallet,
	]);
	const afterDisconnect = useRefCallback(afterDisconnect_);

	return React.useCallback(() => {
		onDisconnect();
		disconnectWallet();
		disconnectEmail();
		afterDisconnect();
	}, [disconnectWallet, disconnectEmail, afterDisconnect]);
}
