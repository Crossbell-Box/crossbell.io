import React from "react";

import { SelectWalletToConnect as Main } from "../../../../scenes";

import { SceneKind } from "../../types";
import { useScenesStore } from "../../stores";
import { Header } from "../../components/header";

export function SelectWalletToConnect() {
	const goTo = useScenesStore(({ goTo }) => goTo);

	return (
		<Main
			Header={Header}
			onSelectWallet={(wallet) => {
				goTo({ kind: SceneKind.connectWallet, wallet });
			}}
			onSelectNoWallet={() => {
				goTo({ kind: SceneKind.getAWallet });
			}}
		/>
	);
}
