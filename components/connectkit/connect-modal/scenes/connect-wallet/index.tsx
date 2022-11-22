import React from "react";
import { useAccount } from "wagmi";

import { PickScene, SceneKind } from "../../types";
import { useModalStore } from "../../stores";

import { ConnectWithQRCode, isQRCodeWalletConnector } from "./qrCode";
import { ConnectWithInjector } from "./injector";

export type ConnectWalletProps = PickScene<SceneKind.connectWallet>;

export function ConnectWallet({ wallet }: ConnectWalletProps) {
	const connector = React.useMemo(() => wallet.createConnector(), [wallet]);
	const modal = useModalStore();
	const { isConnected } = useAccount();

	React.useEffect(() => {
		if (isConnected) {
			modal.hide();
		}
	}, [isConnected, modal]);

	if (isQRCodeWalletConnector(connector)) {
		return <ConnectWithQRCode wallet={wallet} connector={connector} />;
	} else {
		return <ConnectWithInjector wallet={wallet} connector={connector} />;
	}
}
