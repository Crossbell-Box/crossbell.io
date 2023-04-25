import React from "react";
import { DynamicContainer, DynamicContainerContent } from "@crossbell/ui";

import { BaseModal, Congrats } from "../../components";
import { waitUntilModalClosed } from "../../utils";

import { Scene, SceneKind } from "./types";
import {
	StoresProvider,
	useWalletMintNewCharacterModal,
	useScenesStore,
} from "./stores";

import { MintCharacter } from "./scenes/mint-character";

export { useWalletMintNewCharacterModal };

export function showWalletMintNewCharacterModal() {
	useWalletMintNewCharacterModal.getState().show();
	return waitUntilModalClosed(useWalletMintNewCharacterModal);
}

export function WalletMintNewCharacter() {
	const { isActive, hide } = useWalletMintNewCharacterModal();
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
	const currentScene = useScenesStore((s) => s.computed.currentScene);

	return (
		<DynamicContainerContent id={currentScene.kind}>
			{renderScene(currentScene)}
		</DynamicContainerContent>
	);
}

function renderScene(scene: Scene) {
	switch (scene.kind) {
		case SceneKind.congrats:
			return <Congrats {...scene} />;
		case SceneKind.mintCharacter:
			return <MintCharacter {...scene} />;
	}
}

function useResetStore() {
	const { isActive } = useWalletMintNewCharacterModal();
	const keyRef = React.useRef(0);

	React.useMemo(() => {
		if (isActive) {
			keyRef.current += 1;
		}
	}, [isActive]);

	return keyRef.current;
}
