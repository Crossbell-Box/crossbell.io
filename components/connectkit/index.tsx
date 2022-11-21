import React from "react";
import { useAccount } from "wagmi";

import { useAccountStore } from "./account";
import { ConnectModal, useModalStore } from "./connect-modal";

export * from "./account";

export function useConnectKit() {
	const modal = useModalStore();
	return { modal };
}

export function ConnectKitProvider({ children }: React.PropsWithChildren) {
	const accountStore = useAccountStore();
	const account = useAccount();

	console.log(accountStore);

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
			{children}
		</>
	);
}
