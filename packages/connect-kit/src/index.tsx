import React from "react";
import { useAccount } from "wagmi";

import { useAccountState } from "./hooks";
import { UseWeb2UrlContext, GetWeb2Url, usePreloadAllImgs } from "./utils";
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

export type ConnectKitProviderProps = {
	children: React.ReactNode;
	ipfsLinkToHttpLink?: GetWeb2Url;
};

export function ConnectKitProvider({
	children,
	ipfsLinkToHttpLink,
}: ConnectKitProviderProps) {
	const accountStore = useAccountState();
	const account = useAccount();

	React.useEffect(() => {
		accountStore.connectWallet(account.address ?? null);
	}, [account.address]);

	React.useEffect(() => {
		accountStore.refresh();
		accountStore.markSSRReady();
	}, []);

	usePreloadAllImgs();

	return (
		<UseWeb2UrlContext.Provider value={ipfsLinkToHttpLink ?? null}>
			<ConnectModal />
			<DisconnectModal />
			<UpgradeAccountModal />
			<ClaimCSBModal />
			{children}
		</UseWeb2UrlContext.Provider>
	);
}
