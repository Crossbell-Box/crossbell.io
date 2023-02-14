import React from "react";
import { useAccount } from "wagmi";
import { Notifications } from "@mantine/notifications";
import {
	UseWeb2UrlContext,
	GetWeb2Url,
	UrlComposerContext,
	UrlComposer,
} from "@crossbell/ui";

import { usePreloadAllImgs } from "./utils";
import { useAccountState } from "./hooks";
import { ClaimCSBTipsModal } from "./modals/claim-csb-tips-modal";
import { ConnectModal } from "./modals/connect-modal";
import { DisconnectModal } from "./modals/disconnect-modal";
import { UpgradeAccountModal } from "./modals/upgrade-account-modal";
import { CsbDetailModal } from "./modals/csb-detail-modal";
import { WalletClaimCSBModal } from "./modals/wallet-claim-csb-modal";
import { OpSignSettingsModal } from "./modals/op-sign-settings-modal";
import { TransferCSBToOperatorModal } from "./modals/transfer-csb-to-operator-modal";
import { NoEnoughCSBModal } from "./modals/no-enough-csb-modal";
import { WalletMintNewCharacter } from "./modals/wallet-mint-new-character";
import { SelectCharactersModal } from "./modals/select-characters-modal";

export { useConnectModal } from "./modals/connect-modal";
export { useDisconnectModal } from "./modals/disconnect-modal";
export { useUpgradeAccountModal } from "./modals/upgrade-account-modal";
export { useCsbDetailModal } from "./modals/csb-detail-modal";
export { useWalletClaimCSBModal } from "./modals/wallet-claim-csb-modal";
export { useOpSignSettingsModal } from "./modals/op-sign-settings-modal";
export { useWalletMintNewCharacterModal } from "./modals/wallet-mint-new-character";
export { useSelectCharactersModal } from "./modals/select-characters-modal";
export { OpSignIcon } from "./components";
export * from "./hooks";
export * from "./contract-config";

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
	const accountState = useAccountState();
	const account = useAccount();

	React.useEffect(() => {
		accountState.connectWallet(account.address ?? null);
	}, [account.address]);

	React.useEffect(() => {
		accountState.refreshEmail();
		accountState.markSSRReady();
	}, []);

	usePreloadAllImgs();

	const node = (
		<UseWeb2UrlContext.Provider value={ipfsLinkToHttpLink ?? null}>
			<UrlComposerContext.Provider value={urlComposer ?? null}>
				<ConnectModal />
				<DisconnectModal />
				<UpgradeAccountModal />
				<ClaimCSBTipsModal />
				<CsbDetailModal />
				<WalletClaimCSBModal />
				<OpSignSettingsModal />
				<TransferCSBToOperatorModal />
				<NoEnoughCSBModal />
				<WalletMintNewCharacter />
				<SelectCharactersModal />
				{children}
			</UrlComposerContext.Provider>
		</UseWeb2UrlContext.Provider>
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
