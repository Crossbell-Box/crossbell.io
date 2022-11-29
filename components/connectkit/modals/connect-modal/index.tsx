import React from "react";
import { Modal } from "@mantine/core";
import { useAccount } from "wagmi";

import { DynamicContainer, DynamicContainerContent } from "../../components";

import { SceneKind } from "./types";
import { useScenesStore, useModalStore, StoresProvider } from "./stores";

import { AboutWallets } from "./scenes/about-wallets";
import { ConnectKindDifferences } from "./scenes/connect-kind-differences";
import { ConnectWallet } from "./scenes/connect-wallet";
import { DoNotHaveWallet } from "./scenes/do-not-have-wallet";
import { InputEmailToConnect } from "./scenes/input-email-to-connect";
import { InputEmailToRegister1 } from "./scenes/input-email-to-register-1";
import { InputEmailToRegister2 } from "./scenes/input-email-to-register-2";
import { InputEmailToRegister3 } from "./scenes/input-email-to-register-3";
import { InputEmailToRegister4 } from "./scenes/input-email-to-register-4";
import { InputEmailToResetPassword1 } from "./scenes/input-email-to-reset-password-1";
import { InputEmailToResetPassword2 } from "./scenes/input-email-to-reset-password-2";
import { InputEmailToResetPassword3 } from "./scenes/input-email-to-reset-password-3";
import { SelectConnectKind } from "./scenes/select-connect-kind";
import { SelectWalletToConnect } from "./scenes/select-wallet-to-connect";

export { useModalStore };

export function ConnectModal() {
	const { isActive, hide } = useModalStore();
	const { isConnected } = useAccount();
	const storeKey = useResetStore();

	React.useEffect(() => {
		if (isConnected) {
			hide();
		}
	}, [isConnected, hide]);

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
					case SceneKind.selectConnectKind:
						return <SelectConnectKind />;
					case SceneKind.aboutWallets:
						return <AboutWallets />;
					case SceneKind.connectKindDifferences:
						return <ConnectKindDifferences />;
					case SceneKind.selectWalletToConnect:
						return <SelectWalletToConnect />;
					case SceneKind.doNotHaveWallet:
						return <DoNotHaveWallet />;
					case SceneKind.connectWallet:
						return <ConnectWallet {...currentScene} />;
					case SceneKind.inputEmailToConnect:
						return <InputEmailToConnect />;
					case SceneKind.inputEmailToRegister1:
						return <InputEmailToRegister1 />;
					case SceneKind.inputEmailToRegister2:
						return <InputEmailToRegister2 />;
					case SceneKind.inputEmailToRegister3:
						return <InputEmailToRegister3 />;
					case SceneKind.inputEmailToRegister4:
						return <InputEmailToRegister4 />;
					case SceneKind.inputEmailToResetPassword1:
						return <InputEmailToResetPassword1 />;
					case SceneKind.inputEmailToResetPassword2:
						return <InputEmailToResetPassword2 />;
					case SceneKind.inputEmailToResetPassword3:
						return <InputEmailToResetPassword3 />;
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
