import React from "react";
import { DynamicContainer, DynamicContainerContent } from "@crossbell/ui";

import { BaseModal, Congrats } from "../../components";

import { SceneKind } from "./types";
import {
	useScenesStore,
	useUpgradeAccountModal,
	StoresProvider,
} from "./stores";

import { Header } from "./components/header";
import { ConnectKindDifferences } from "./scenes/connect-kind-differences";
import { SelectOptions } from "./scenes/select-options";
import { SelectWalletToConnect } from "./scenes/select-wallet-to-connect";
import { ConnectWallet } from "./scenes/connect-wallet";
import { ConfirmUpgrade } from "./scenes/confirm-upgrade";
import { GetAWallet } from "../../scenes";

export { useUpgradeAccountModal };

export function UpgradeAccountModal() {
	const { isActive, hide } = useUpgradeAccountModal();
	const storeKey = useResetStore();

	return (
		<BaseModal isActive={isActive} onClose={hide}>
			<DynamicContainer>
				<StoresProvider key={storeKey}>
					<Main />
				</StoresProvider>
			</DynamicContainer>
		</BaseModal>
	);
}

function Main() {
	const scene = useScenesStore(({ computed }) => computed.currentScene);

	return (
		<DynamicContainerContent id={scene.kind}>
			{((): React.ReactNode => {
				switch (scene.kind) {
					case SceneKind.selectOptions:
						return <SelectOptions />;
					case SceneKind.connectKindDifferences:
						return <ConnectKindDifferences />;
					case SceneKind.selectWalletToConnect:
						return <SelectWalletToConnect />;
					case SceneKind.connectWallet:
						return <ConnectWallet {...scene} />;
					case SceneKind.congrats:
						return <Congrats {...scene} />;
					case SceneKind.getAWallet:
						return <GetAWallet Header={Header} />;
					case SceneKind.confirmUpgrade:
						return <ConfirmUpgrade {...scene} />;
				}
			})()}
		</DynamicContainerContent>
	);
}

function useResetStore() {
	const { isActive } = useUpgradeAccountModal();
	const keyRef = React.useRef(0);

	React.useMemo(() => {
		if (isActive) {
			keyRef.current += 1;
		}
	}, [isActive]);

	return keyRef.current;
}
