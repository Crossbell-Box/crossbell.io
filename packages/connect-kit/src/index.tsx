import React from "react";
import { useAccount } from "wagmi";
import { Notifications } from "@mantine/notifications";
import {
	UseWeb2UrlContext,
	GetWeb2Url,
	UrlComposerContext,
	UrlComposerContextValue,
} from "@crossbell/ui";
import { InitContractProvider } from "@crossbell/contract";

import { usePreloadAllImgs } from "./utils";
import { useAccountState } from "./hooks";
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
import { contractConfig } from "./contract-config";

export { useConnectModal } from "./modals/connect-modal";
export { useDisconnectModal } from "./modals/disconnect-modal";
export { showUpgradeAccountModal } from "./modals/upgrade-account-modal";
export { useCsbDetailModal } from "./modals/csb-detail-modal";
export { useWalletClaimCSBModal } from "./modals/wallet-claim-csb-modal";
export { useOpSignSettingsModal } from "./modals/op-sign-settings-modal";
export { useWalletMintNewCharacterModal } from "./modals/wallet-mint-new-character";
export { useSelectCharactersModal } from "./modals/select-characters-modal";
export { showXSettingsModal } from "./modals/x-settings-modal";
export { OpSignIcon } from "./components";
export * from "./hooks";
export * from "./get-default-client";

export type ConnectKitProviderProps = {
	children: React.ReactNode;
	ipfsLinkToHttpLink?: GetWeb2Url;
	withoutNotificationsProvider?: boolean;
	urlComposer?: UrlComposerContextValue;
};

export function ConnectKitProvider({
	children,
	ipfsLinkToHttpLink,
	withoutNotificationsProvider,
	urlComposer,
}: ConnectKitProviderProps) {
	const accountState = useAccountState();
	const account = useAccount();

	React.useEffect(() => {
		if (account.status === "connected") {
			accountState.connectWallet(account.address ?? null);
		}

		if (account.status === "disconnected") {
			accountState.connectWallet(null);
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
					{children}
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
