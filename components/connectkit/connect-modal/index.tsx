import React from "react";
import { Modal } from "@mantine/core";
import { useIsomorphicEffect } from "@mantine/hooks";

import { motion, AnimatePresence } from "framer-motion";

import { SceneKind } from "./types";
import { useScenesStore, useModalStore, StoresProvider } from "./stores";
import { ConnectModalContext } from "./context";

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

import styles from "./index.module.css";

export { useModalStore };

export function ConnectModal() {
	const { isActive, hide } = useModalStore();
	const { size, updateElm, refreshSize } = useContainerSize();
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
			classNames={{
				modal: styles.layoutContainer,
			}}
			styles={{
				modal: { width: `${size.width}px`, height: `${size.height}px` },
			}}
		>
			<StoresProvider key={storeKey}>
				<ConnectModalContext.Provider value={{ refreshSize }}>
					<Main updateElm={updateElm} />
				</ConnectModalContext.Provider>
			</StoresProvider>
		</Modal>
	);
}

function Main({ updateElm }: { updateElm: React.Ref<HTMLDivElement> }) {
	const currentScene = useScenesStore(({ computed }) => computed.currentScene);

	return (
		<AnimatePresence>
			{[
				<motion.div
					className={styles.sceneContainer}
					ref={updateElm}
					key={currentScene.kind}
					transition={{ duration: 0.1 }}
					exit={{ opacity: 0 }}
				>
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
				</motion.div>,
			]}
		</AnimatePresence>
	);
}

function useContainerSize() {
	type Size = Record<"width" | "height", number | null>;

	const elmRef = React.useRef<Element | null>(null);
	const [refreshCount, setRefreshCount] = React.useState(0);
	const [size, setSize] = React.useState<Size>({ width: null, height: null });

	const refreshSize = React.useCallback(() => {
		setRefreshCount((count) => count + 1);
	}, []);

	const updateElm = React.useCallback(
		(elm: Element | null) => {
			if (elm) {
				elmRef.current = elm;
				refreshSize();
			}
		},
		[refreshSize]
	);

	useIsomorphicEffect(() => {
		const elm = elmRef.current;

		if (elm) {
			setSize({ width: elm.scrollWidth, height: elm.scrollHeight });
		}
	}, [refreshCount]);

	return {
		size,
		updateElm,
		refreshSize,
	};
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
