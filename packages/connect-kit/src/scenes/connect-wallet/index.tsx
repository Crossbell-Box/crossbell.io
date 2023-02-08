import React from "react";

import { ModalHeaderProps } from "../../components";

import { Wallet } from "../../wallets";
import { ConnectWithQRCode, isQRCodeWalletConnector } from "./qrCode";
import { ConnectWithInjector } from "./injector";

export type ConnectWalletProps = {
	Header: React.ComponentType<ModalHeaderProps>;
	wallet: Wallet;
};

export function ConnectWallet({ wallet, Header }: ConnectWalletProps) {
	const connector = React.useMemo(() => wallet.createConnector(), [wallet]);

	if (isQRCodeWalletConnector(connector)) {
		return (
			<ConnectWithQRCode
				Header={Header}
				wallet={wallet}
				connector={connector}
			/>
		);
	} else {
		return (
			<ConnectWithInjector
				Header={Header}
				wallet={wallet}
				connector={connector}
			/>
		);
	}
}
