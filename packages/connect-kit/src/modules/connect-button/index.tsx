import React from "react";
import { useAccountState, GeneralAccount } from "@crossbell/react-account";

import { useConnectModal } from "../../modals/connect-modal";
import { useDisconnectModal } from "../../modals/disconnect-modal";
import { useSelectCharactersModal } from "../../modals/select-characters-modal";

export type ConnectButtonStatus =
	| {
			isConnected: false;
			ssrReady: boolean;
			account: null;
			displayAddress: null;
	  }
	| {
			isConnected: true;
			ssrReady: boolean;
			account: GeneralAccount;
			displayAddress: string;
	  };

export type ConnectButtonActions = {
	connect: () => void;
	disconnect: () => void;
	selectCharacters: () => void;
};

export type ConnectButtonProps = {
	children: (
		params: ConnectButtonStatus,
		actions: ConnectButtonActions,
	) => React.ReactNode;
};

export function ConnectButton({ children }: ConnectButtonProps): JSX.Element {
	const connectModal = useConnectModal();
	const disconnectModal = useDisconnectModal();
	const selectCharactersModal = useSelectCharactersModal();
	const [account, ssrReady] = useAccountState((s) => [
		s.computed.account,
		s.ssrReady,
	]);

	return (
		<>
			{children(
				account
					? {
							isConnected: true,
							ssrReady,
							account,
							displayAddress:
								account?.type === "email" ? account.email : account?.address,
					  }
					: {
							isConnected: false,
							ssrReady,
							account,
							displayAddress: null,
					  },
				{
					connect: connectModal.show,
					disconnect: disconnectModal.show,
					selectCharacters: selectCharactersModal.show,
				},
			)}
		</>
	);
}
