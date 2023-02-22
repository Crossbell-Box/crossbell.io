import React from "react";
import { DynamicContainer, DynamicContainerContent } from "@crossbell/ui";

import { BaseModal, Congrats } from "../../components";
import { SignInWithWallet, OPSignSettings } from "../../scenes";

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
import { SelectCharacters } from "./scenes/select-characters";
import { GetAWallet } from "../../scenes";
import { MintCharacter } from "./scenes/mint-character";

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
					case SceneKind.signInWithWallet:
						return <SignInWithWallet Header={Header} {...scene} />;
					case SceneKind.selectCharacters:
						return <SelectCharacters />;
					case SceneKind.opSignSettings:
						return <OPSignSettings Header={Header} {...scene} />;
					case SceneKind.mintCharacter:
						return <MintCharacter {...scene} />;
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
