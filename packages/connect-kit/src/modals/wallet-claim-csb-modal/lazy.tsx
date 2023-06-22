import React from "react";
import { DynamicContainerContent } from "@crossbell/ui";

import { Congrats } from "../../components";

import { SceneKind } from "./types";
import {
	useScenesStore,
	useWalletClaimCSBModal,
	StoresProvider,
} from "./stores";

import { ClaimCSB } from "./scenes/claim-csb";

export default function WalletClaimCSBModal() {
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
					case SceneKind.congrats:
						return <Congrats {...currentScene} />;
					case SceneKind.claimCSB:
						return <ClaimCSB />;
				}
			})()}
		</DynamicContainerContent>
	);
}

function useResetStore() {
	const { isActive } = useWalletClaimCSBModal();
	const keyRef = React.useRef(0);

	React.useMemo(() => {
		if (isActive) {
			keyRef.current += 1;
		}
	}, [isActive]);

	return keyRef.current;
}
