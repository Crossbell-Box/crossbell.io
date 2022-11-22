import React from "react";
import { useAccount } from "wagmi";

import { useAccountStore } from "./account";
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

export * from "./account";

export { useConnectModal, useDisconnectModal, useUpgradeAccountModal };

export function ConnectKitProvider({ children }: React.PropsWithChildren) {
	const accountStore = useAccountStore();
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
