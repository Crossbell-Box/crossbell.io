import React from "react";
import { Modal } from "@mantine/core";

import { DynamicContainer, DynamicContainerContent } from "../../components";

import { SceneKind } from "./types";
import { useScenesStore, useModalStore, StoresProvider } from "./stores";

import { ConnectKindDifferences } from "./scenes/connect-kind-differences";
import { SelectOptions } from "./scenes/select-options";
import { UpgradeToWallet } from "./scenes/upgrade-to-wallet";

export { useModalStore };

export function UpgradeAccountModal() {
	const { isActive, hide } = useModalStore();
	const storeKey = useResetStore();

	return (
		<Modal
			size="auto"
			radius={28}
			withCloseButton={false}
			opened={isActive}
			onClose={hide}
			centered={true}
			padding={0}
		>
			<DynamicContainer className="rounded-28px">
				<StoresProvider key={storeKey}>
					<Main />
				</StoresProvider>
			</DynamicContainer>
		</Modal>
	);
}

function Main() {
	const currentScene = useScenesStore(({ computed }) => computed.currentScene);

	return (
		<DynamicContainerContent id={currentScene.kind}>
			{((): JSX.Element => {
				switch (currentScene.kind) {
					case SceneKind.selectOptions:
						return <SelectOptions />;
					case SceneKind.connectKindDifferences:
						return <ConnectKindDifferences />;
					case SceneKind.upgradeToWallet:
						return <UpgradeToWallet />;
				}
			})()}
		</DynamicContainerContent>
	);
}

function useResetStore() {
	const { isActive } = useModalStore();
	const keyRef = React.useRef(0);

	React.useMemo(() => {
		if (isActive) {
			keyRef.current += 1;
		}
	}, [isActive]);

	return keyRef.current;
}
