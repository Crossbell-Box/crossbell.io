import React from "react";
import { useAccount } from "wagmi";

import { useAccountState } from "./hooks";
import { ClaimCSBModal } from "./modals/claim-csb-modal";
import {
	ConnectModal,
	useModalStore as useConnectModal,
} from "./modals/connect-modal";
import {
	DisconnectModal,
	useModalStore as useDisconnectModal,
} from "./modals/disconnect-modal";
import {
	UpgradeAccountModal,
	useModalStore as useUpgradeAccountModal,
} from "./modals/upgrade-account-modal";

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
			<ClaimCSBModal />
			{children}
		</>
	);
}
