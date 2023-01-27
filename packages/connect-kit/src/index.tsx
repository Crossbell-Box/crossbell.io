import React from "react";
import { useAccount } from "wagmi";
import { NotificationsProvider } from "@mantine/notifications";
import {
	UseWeb2UrlContext,
	GetWeb2Url,
	UrlComposerContext,
	UrlComposer,
} from "@crossbell/ui";

import {
	usePreloadAllImgs,
	ReCAPTCHAContext,
	ReCAPTCHAContextType,
} from "./utils";
import { useAccountState } from "./hooks";
import { ClaimCSBTipsModal } from "./modals/claim-csb-tips-modal";
import { ConnectModal } from "./modals/connect-modal";
import { DisconnectModal } from "./modals/disconnect-modal";
import { UpgradeAccountModal } from "./modals/upgrade-account-modal";
import { CsbDetailModal } from "./modals/csb-detail-modal";
import { WalletClaimCSBModal } from "./modals/wallet-claim-csb-modal";
import { OpSignSettingsModal } from "./modals/op-sign-settings-modal";

export { useConnectModal } from "./modals/connect-modal";
export { useDisconnectModal } from "./modals/disconnect-modal";
export { useUpgradeAccountModal } from "./modals/upgrade-account-modal";
export { useCsbDetailModal } from "./modals/csb-detail-modal";
export { useWalletClaimCSBModal } from "./modals/wallet-claim-csb-modal";
export { useOpSignSettingsModal } from "./modals/op-sign-settings-modal";
export { OpSignIcon } from "./components";
export * from "./hooks";

export type ConnectKitProviderProps = {
	children: React.ReactNode;
	ipfsLinkToHttpLink?: GetWeb2Url;
	withoutNotificationsProvider?: boolean;
	urlComposer?: Partial<UrlComposer>;
	reCAPTCHA?: ReCAPTCHAContextType;
};

export function ConnectKitProvider({
	children,
	ipfsLinkToHttpLink,
	withoutNotificationsProvider,
	urlComposer,
	reCAPTCHA,
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
				<ReCAPTCHAContext.Provider value={reCAPTCHA ?? null}>
					<ConnectModal />
					<DisconnectModal />
					<UpgradeAccountModal />
					<ClaimCSBTipsModal />
					<CsbDetailModal />
					<WalletClaimCSBModal />
					<OpSignSettingsModal />
					{children}
				</ReCAPTCHAContext.Provider>
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
