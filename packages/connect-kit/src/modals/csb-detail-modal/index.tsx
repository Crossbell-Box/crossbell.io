import React from "react";

import {
	DynamicContainer,
	DynamicContainerContent,
	BaseModal,
} from "../../components";

import { SceneKind } from "./types";
import { useScenesStore, useCsbDetailModal, StoresProvider } from "./stores";

import { Balance } from "./scenes/balance";
import { ClaimCSB } from "./scenes/claim-csb";

export { useCsbDetailModal };

export function CsbDetailModal() {
	const { isActive, hide } = useCsbDetailModal();
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
					case SceneKind.balance:
						return <Balance />;
					case SceneKind.claimCSB:
						return <ClaimCSB />;
				}
			})()}
		</DynamicContainerContent>
	);
}

function useResetStore() {
	const { isActive } = useCsbDetailModal();
	const keyRef = React.useRef(0);

	React.useMemo(() => {
		if (isActive) {
			keyRef.current += 1;
		}
	}, [isActive]);

	return keyRef.current;
}