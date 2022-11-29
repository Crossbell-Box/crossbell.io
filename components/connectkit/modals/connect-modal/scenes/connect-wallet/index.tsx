import React from "react";

import { PickScene, SceneKind } from "../../types";

import { ConnectWithQRCode, isQRCodeWalletConnector } from "./qrCode";
import { ConnectWithInjector } from "./injector";

export type ConnectWalletProps = PickScene<SceneKind.connectWallet>;

export function ConnectWallet({ wallet }: ConnectWalletProps) {
	const connector = React.useMemo(() => wallet.createConnector(), [wallet]);

	if (isQRCodeWalletConnector(connector)) {
		return <ConnectWithQRCode wallet={wallet} connector={connector} />;
	} else {
		return <ConnectWithInjector wallet={wallet} connector={connector} />;
	}
}
