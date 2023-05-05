import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Notifications } from "@mantine/notifications";
import {
	UseWeb2UrlContext,
	GetWeb2Url,
	UrlComposerContext,
	UrlComposerContextValue,
} from "@crossbell/ui";
import { InitContractProvider } from "@crossbell/contract";
import { MantineProvider } from "@mantine/core";
import {
	useAccountState,
	ReactAccountProvider,
} from "@crossbell/react-account";
import { useRefCallback } from "@crossbell/util-hooks";

import { usePreloadAllImgs } from "./utils";
import { ClaimCSBTipsModal } from "./modals/claim-csb-tips-modal";
import { ConnectModal } from "./modals/connect-modal";
import { DisconnectModal } from "./modals/disconnect-modal";
import { CsbDetailModal } from "./modals/csb-detail-modal";
import { WalletClaimCSBModal } from "./modals/wallet-claim-csb-modal";
import { OpSignSettingsModal } from "./modals/op-sign-settings-modal";
import { TransferCSBToOperatorModal } from "./modals/transfer-csb-to-operator-modal";
import { NoEnoughCSBModal } from "./modals/no-enough-csb-modal";
import { WalletMintNewCharacter } from "./modals/wallet-mint-new-character";
import { SelectCharactersModal } from "./modals/select-characters-modal";
import { DynamicScenesModal } from "./components/dynamic-scenes-modal";
import { SentryPrivacyModal } from "./modals/sentry-privacy-modal";
import { SwitchNetworkModal } from "./modals/switch-network-modal";
import { TipModal } from "./modals/tip-modal";
import { SetupSentry } from "./scenes/for-dynamic-modal/privacy-and-security";
import { XSettingsConfig, XSettingsConfigContext } from "./x-settings-config";
import {
	ConnectKitConfig,
	ConnectKitConfigContext,
} from "./connect-kit-config";
import { useContractConfig } from "./contract-config";
import { setupReactAccount } from "./setup-react-account";

import type {} from "wagmi/window";

export * from "@crossbell/react-account";
export { useConnectModal } from "./modals/connect-modal";
export { useDisconnectModal } from "./modals/disconnect-modal";
export {
	useUpgradeEmailAccountModal,
	showUpgradeEmailAccountModal,
} from "./modals/upgrade-account-modal";
export { useCsbDetailModal } from "./modals/csb-detail-modal";
export { useWalletClaimCSBModal } from "./modals/wallet-claim-csb-modal";
export { useOpSignSettingsModal } from "./modals/op-sign-settings-modal";
export { useWalletMintNewCharacterModal } from "./modals/wallet-mint-new-character";
export { useSelectCharactersModal } from "./modals/select-characters-modal";
export { useSentryPrivacyModal } from "./modals/sentry-privacy-modal";
export { useTipModal } from "./modals/tip-modal";
export {
	useXSettingsModal,
	showXSettingsModal,
} from "./modals/x-settings-modal";
export * from "./modals/edit-character-profile-modal";
export * from "./hooks";
export * from "./get-default-client-config";
export * from "./components/public";
export type { XSettingsConfig } from "./x-settings-config";

export type ConnectKitProviderProps = {
	children: React.ReactNode;
	ipfsLinkToHttpLink?: GetWeb2Url;
	withoutNotificationsProvider?: boolean;
	urlComposer?: UrlComposerContextValue;
	xSettings?: Partial<XSettingsConfig>;
	// Used for the case when we want to keep the user logged in even if the user disconnects from the wallet
	ignoreWalletDisconnectEvent?: boolean;
} & Partial<ConnectKitConfig>;

const theme = { colorScheme: "light" } as const;

setupReactAccount();

export function ConnectKitProvider({
	children,
	ipfsLinkToHttpLink,
	withoutNotificationsProvider,
	urlComposer,
	xSettings,
	ignoreWalletDisconnectEvent,
	...connectKitConfig
}: ConnectKitProviderProps) {
	const accountState = useAccountState();
	const account = useAccount();
	const contractConfig = useContractConfig();
	const { disconnect } = useDisconnect();
	const getWalletClient = useRefCallback(
		async () => account.connector!.getWalletClient()!
	);

	React.useEffect(() => {
		if (account.status === "connected") {
			accountState.connectWallet(account.address);
		}

		if (!ignoreWalletDisconnectEvent && account.status === "disconnected") {
			accountState.disconnectWallet();
		}
	}, [account.address, account.status]);

	React.useEffect(() => {
		accountState.refreshEmail();
		accountState.markSSRReady();
	}, []);

	usePreloadAllImgs();

	const node = (
		<InitContractProvider {...contractConfig}>
			<UseWeb2UrlContext.Provider value={ipfsLinkToHttpLink ?? null}>
				<UrlComposerContext.Provider value={urlComposer ?? null}>
					<ReactAccountProvider
						getWalletClient={getWalletClient}
						onDisconnect={disconnect}
					>
						<ConnectKitConfigContext.Provider value={connectKitConfig}>
							<XSettingsConfigContext.Provider value={xSettings ?? null}>
								<MantineProvider theme={theme}>
									<ConnectModal />
									<DisconnectModal />
									<ClaimCSBTipsModal />
									<CsbDetailModal />
									<WalletClaimCSBModal />
									<OpSignSettingsModal />
									<TransferCSBToOperatorModal />
									<NoEnoughCSBModal />
									<WalletMintNewCharacter />
									<SelectCharactersModal />
									<DynamicScenesModal />
									<SetupSentry />
									<SentryPrivacyModal />
									<TipModal />
									<SwitchNetworkModal />
								</MantineProvider>
								{children}
							</XSettingsConfigContext.Provider>
						</ConnectKitConfigContext.Provider>
					</ReactAccountProvider>
				</UrlComposerContext.Provider>
			</UseWeb2UrlContext.Provider>
		</InitContractProvider>
	);

	return withoutNotificationsProvider ? (
		node
	) : (
		<>
			{node}
			<Notifications position="bottom-center" zIndex={99999} />
		</>
	);
}
