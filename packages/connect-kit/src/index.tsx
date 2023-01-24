import React from "react";
import { useAccount } from "wagmi";
import { NotificationsProvider } from "@mantine/notifications";
import {
	UseWeb2UrlContext,
	GetWeb2Url,
	UrlComposerContext,
	UrlComposer,
} from "@crossbell/ui";

import { usePreloadAllImgs } from "./utils";
import { useAccountState } from "./hooks";
import { NotEnoughCSBModal } from "./modals/not-enough-csb-modal";
import { ConnectModal } from "./modals/connect-modal";
import { DisconnectModal } from "./modals/disconnect-modal";
import { UpgradeAccountModal } from "./modals/upgrade-account-modal";
import { CsbDetailModal } from "./modals/csb-detail-modal";

export { useConnectModal } from "./modals/connect-modal";
export { useDisconnectModal } from "./modals/disconnect-modal";
export { useUpgradeAccountModal } from "./modals/upgrade-account-modal";
export { useCsbDetailModal } from "./modals/csb-detail-modal";
export { OpSignIcon } from "./components";
export * from "./hooks";

export type ConnectKitProviderProps = {
	children: React.ReactNode;
	ipfsLinkToHttpLink?: GetWeb2Url;
	withoutNotificationsProvider?: boolean;
	urlComposer?: Partial<UrlComposer>;
};

export function ConnectKitProvider({
	children,
	ipfsLinkToHttpLink,
	withoutNotificationsProvider,
	urlComposer,
}: ConnectKitProviderProps) {
	const accountStore = useAccountState();
	const account = useAccount();

	React.useEffect(() => {
		accountStore.connectWallet(account.address ?? null);
	}, [account.address]);

	React.useEffect(() => {
		accountStore.refreshEmail();
		accountStore.markSSRReady();
	}, []);

	usePreloadAllImgs();

	const node = (
		<UseWeb2UrlContext.Provider value={ipfsLinkToHttpLink ?? null}>
			<UrlComposerContext.Provider value={urlComposer ?? null}>
				<ConnectModal />
				<DisconnectModal />
				<UpgradeAccountModal />
				<NotEnoughCSBModal />
				<CsbDetailModal />
				{children}
			</UrlComposerContext.Provider>
		</UseWeb2UrlContext.Provider>
	);

	return withoutNotificationsProvider ? (
		node
	) : (
		<NotificationsProvider position="bottom-center" zIndex={99999}>
			{node}
		</NotificationsProvider>
	);
}
