import React from "react";

import { SelectOptions as Main } from "../../../scenes/upgrade-account/select-options";

import { SceneKind } from "../types";
import { useScenesStore, useUpgradeAccountModal } from "../stores";
import { Header } from "../components/header";

export function SelectOptions() {
	const goToScene = useScenesStore(({ goTo }) => goTo);
	const hideModal = useUpgradeAccountModal((s) => s.hide);

	return (
		<Main
			onSelectDifferences={() => {
				goToScene({ kind: SceneKind.connectKindDifferences });
			}}
			onSelectWallet={() => {
				goToScene({ kind: SceneKind.selectWalletToConnect });
			}}
			onSkip={hideModal}
			Header={Header}
		/>
	);
}
