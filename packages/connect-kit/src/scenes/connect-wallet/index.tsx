import React from "react";
import { useAccount } from "wagmi";

import { ModalHeaderProps } from "../../components";

import { Wallet } from "../../wallets";
import { ConnectWithQRCode, isQRCodeWalletConnector } from "./qrCode";
import { ConnectWithInjector } from "./injector";

export type ConnectWalletProps = {
	Header: React.ComponentType<ModalHeaderProps>;
	wallet: Wallet;
	onConnect?: () => void;
};

export function ConnectWallet({
	wallet,
	Header,
	onConnect,
}: ConnectWalletProps) {
	const connector = React.useMemo(() => wallet.createConnector(), [wallet]);
	const { isConnected } = useAccount();

	React.useEffect(() => {
		if (isConnected) {
			onConnect?.();
		}
	}, [isConnected]);

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
