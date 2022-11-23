import React from "react";
import { useAccount } from "wagmi";

import { useAccountState } from "./hooks";
import {
	ConnectModal,
	useModalStore as useConnectModal,
} from "./connect-modal";
import {
	DisconnectModal,
	useModalStore as useDisconnectModal,
} from "./disconnect-modal";
import {
	UpgradeAccountModal,
	useModalStore as useUpgradeAccountModal,
} from "./upgrade-account-modal";

export * from "./hooks";

export { useConnectModal, useDisconnectModal, useUpgradeAccountModal };

export function ConnectKitProvider({ children }: React.PropsWithChildren) {
	const accountStore = useAccountState();
	const account = useAccount();

	React.useEffect(() => {
		accountStore.connectWallet(account.address ?? null);
	}, [account.address]);

	React.useEffect(() => {
		accountStore.refreshEmail();
		accountStore.refreshWallet();
		accountStore.markSSRReady();
	}, []);

	return (
		<>
			<ConnectModal />
			<DisconnectModal />
			<UpgradeAccountModal />
			{children}
		</>
	);
}
