import React from "react";
import { DynamicContainerContent } from "@crossbell/ui";

import { Congrats } from "../../components";

import { Scene, SceneKind } from "./types";
import {
	StoresProvider,
	useWalletMintNewCharacterModal,
	useScenesStore,
} from "./stores";

import { MintCharacter } from "./scenes/mint-character";

export default function WalletMintNewCharacter() {
	const storeKey = useResetStore();

	return (
		<StoresProvider key={storeKey}>
			<Main />
		</StoresProvider>
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
