import React from "react";
import { useAccount } from "wagmi";

import {
	BaseModal,
	DynamicContainer,
	DynamicContainerContent,
} from "../../components";

import { SceneKind } from "./types";
import { StoresProvider, useModalStore, useScenesStore } from "./stores";

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
import { SignInWithWallet } from "./scenes/sign-in-with-wallet";
import { SelectCharacters } from "./scenes/select-characters";
import { MintCharacter } from "./scenes/mint-character";
import { MintCharacterQuickly } from "./scenes/mint-character-quickly";

export { useModalStore };

export function ConnectModal() {
	const { isActive, hide } = useModalStore();
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
	const [currentScene, goTo] = useScenesStore((s) => [
		s.computed.currentScene,
		s.goTo,
	]);
	const { isConnected } = useAccount();

	React.useEffect(() => {
		if (isConnected) {
			goTo({ kind: SceneKind.signInWithWallet });
		}
	}, [isConnected, goTo]);

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
					case SceneKind.signInWithWallet:
						return <SignInWithWallet />;
					case SceneKind.selectCharacters:
						return <SelectCharacters />;
					case SceneKind.mintCharacter:
						return <MintCharacter />;
					case SceneKind.mintCharacterQuickly:
						return <MintCharacterQuickly />;
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
