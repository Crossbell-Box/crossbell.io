import React from "react";
import { DynamicContainerContent } from "@crossbell/ui";

import { SceneKind } from "./types";
import {
	useScenesStore,
	useTransferCSBToOperatorModal,
	StoresProvider,
} from "./stores";

import { Transfer } from "./scenes/transfer";
import { TransferSuccess } from "./scenes/transfer-success";

export default function TransferCSBToOperatorModal() {
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
					case SceneKind.transfer:
						return <Transfer />;
					case SceneKind.transferSuccess:
						return <TransferSuccess />;
				}
			})()}
		</DynamicContainerContent>
	);
}

function useResetStore() {
	const { isActive } = useTransferCSBToOperatorModal();
	const keyRef = React.useRef(0);

	React.useMemo(() => {
		if (isActive) {
			keyRef.current += 1;
		}
	}, [isActive]);

	return keyRef.current;
}
