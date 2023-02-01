import React from "react";

import {
	DynamicContainer,
	DynamicContainerContent,
	BaseModal,
	Congrats,
} from "../../components";

import { SceneKind } from "./types";
import {
	useScenesStore,
	useWalletClaimCSBModal,
	StoresProvider,
} from "./stores";

import { ClaimCSB } from "./scenes/claim-csb";

export { useWalletClaimCSBModal };

export function WalletClaimCSBModal() {
	const { isActive, hide } = useWalletClaimCSBModal();
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
