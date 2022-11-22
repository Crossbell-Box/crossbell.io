import React from "react";
import { useDisconnect } from "wagmi";

import { useRefCallback } from "@/utils/hooks/use-ref-callback";

import { useAccountStore } from "./account-store";

export function useDisconnectAccount(afterDisconnect_?: () => void) {
	const { disconnect: disconnectWallet } = useDisconnect();
	const disconnectEmail = useAccountStore((s) => s.disconnectEmail);
	const afterDisconnect = useRefCallback(afterDisconnect_);

	return React.useCallback(() => {
		disconnectWallet();
		disconnectEmail();
		afterDisconnect();
	}, [disconnectWallet, disconnectEmail, afterDisconnect]);
}
