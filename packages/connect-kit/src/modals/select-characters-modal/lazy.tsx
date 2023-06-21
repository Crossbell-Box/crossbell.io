import React from "react";
import { DynamicContainerContent } from "@crossbell/ui";

import { Congrats } from "../../components";

import { Scene, SceneKind } from "./types";
import {
	StoresProvider,
	useSelectCharactersModal,
	useScenesStore,
} from "./stores";

import { SelectCharacters } from "./scenes/select-characters";
import { MintCharacter } from "./scenes/mint-character";
import { OPSignSettings } from "./scenes/op-sign-settings";

export default function SelectCharactersModal() {
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
		case SceneKind.selectCharacters:
			return <SelectCharacters />;
		case SceneKind.mintCharacter:
			return <MintCharacter {...scene} />;
		case SceneKind.opSignSettings:
			return <OPSignSettings {...scene} />;
	}
}

function useResetStore() {
	const { isActive } = useSelectCharactersModal();
	const keyRef = React.useRef(0);

	React.useMemo(() => {
		if (isActive) {
			keyRef.current += 1;
		}
	}, [isActive]);

	return keyRef.current;
}
