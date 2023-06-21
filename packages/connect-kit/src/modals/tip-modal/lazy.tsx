import React from "react";
import { DynamicContainerContent } from "@crossbell/ui";

import { Congrats } from "../../components";

import { SceneKind } from "./types";
import { useScenesStore, useTipModal, StoresProvider } from "./stores";

import { MainScene } from "./scenes/main-scene";
import { TipList } from "./scenes/tip-list";
import styles from "./index.module.css";

export default function TipModal() {
	const storeKey = useResetStore();

	return (
		<StoresProvider key={storeKey}>
			<Main />
		</StoresProvider>
	);
}

function Main() {
	const currentScene = useScenesStore(({ computed }) => computed.currentScene);

	return (
		<DynamicContainerContent id={currentScene.kind}>
			{((): JSX.Element => {
				switch (currentScene.kind) {
					case SceneKind.main:
						return <MainScene />;
					case SceneKind.tipList:
						return (
							<div data-kind="modal-container" className={styles.commonScene}>
								<TipList />
							</div>
						);
					case SceneKind.congrats:
						return (
							<div data-kind="modal-container" className={styles.commonScene}>
								<Congrats {...currentScene} />
							</div>
						);
				}
			})()}
		</DynamicContainerContent>
	);
}

function useResetStore() {
	const { isActive } = useTipModal();
	const keyRef = React.useRef(0);

	React.useMemo(() => {
		if (isActive) {
			keyRef.current += 1;
		}
	}, [isActive]);

	return keyRef.current;
}
