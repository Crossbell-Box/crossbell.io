import React from "react";
import { useAccount } from "wagmi";

import { DynamicScenesHeader, ModalHeaderProps } from "../../components";

import { Wallet } from "../../wallets";
import { ConnectWithQRCode, isQRCodeWalletConnector } from "./qrCode";
import { ConnectWithInjector } from "./injector";

export type ConnectWalletProps = {
	Header?: React.ComponentType<ModalHeaderProps>;
	wallet: Wallet;
	onConnect?: () => void;
};

export function ConnectWallet({
	wallet,
	Header: Header_,
	onConnect,
}: ConnectWalletProps) {
	const connector = React.useMemo(() => wallet.createConnector(), [wallet]);
	const { isConnected } = useAccount();
	const Header = Header_ ?? DynamicScenesHeader;

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
