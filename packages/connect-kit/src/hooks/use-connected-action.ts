import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { useAccount } from "wagmi";

import { useDynamicScenesModal } from "../components";
import { useConnectModal } from "../modals/connect-modal/stores";
import { showUpgradeAccountModal } from "../modals/upgrade-account-modal";
import { useWalletMintNewCharacterModal } from "../modals/wallet-mint-new-character/stores";

import { useAccountState } from "./account-state";
import { useAccountCharacter } from "./use-account-character";
import { useIsOpSignEnabled } from "./operator-sign";

type Callback = () => void;
type ConnectType = "wallet" | "email" | "any";

const useCheckIsConnected = () => {
	const { isConnected: isWalletConnected } = useAccount();
	const character = useAccountCharacter();
	const isOpSignEnabled = useIsOpSignEnabled(character);

	return useRefCallback(
		({
			connectType: type,
			supportOPSign,
		}: {
			connectType: ConnectType;
			supportOPSign: boolean;
		}): boolean => {
			const state = useAccountState.getState();
			const isEmailAccountConnected = !!state.email;
			const isWalletAccountConnected = ((): boolean => {
				if (state.email || !state.wallet?.characterId) return false;

				if (supportOPSign && isOpSignEnabled) {
					return true;
				} else {
					return isWalletConnected;
				}
			})();

			switch (type) {
				case "email":
					return isEmailAccountConnected;
				case "wallet":
					return isWalletAccountConnected;
				case "any":
					return isEmailAccountConnected || isWalletAccountConnected;
			}
		}
	);
};

export type UseConnectedActionOptions<P extends any[] = unknown[], V = void> = {
	noAutoResume?: boolean;
	supportOPSign?: boolean;
	connectType?: ConnectType;
	fallback?: (...params: P) => V;
};

/*
 * Used to wrap an action that needs to be connected/logged in/upgraded before it can be executed.
 * If the user is not connected/logged in, this hooks will display the connect/login/upgrade modal and
 * automatically execute the action when the condition is met.
 * */
export function useConnectedAction<P extends any[], V extends Promise<any>>(
	action: (...params: P) => V,
	options?: UseConnectedActionOptions<P, V>
): (...params: P) => V;

export function useConnectedAction<P extends any[], V>(
	action: (...params: P) => V,
	options?: UseConnectedActionOptions<P, V>
): (...params: P) => Promise<V>;

export function useConnectedAction<P extends any[], V>(
	action: (...params: P) => V,
	{
		connectType = "any",
		noAutoResume = false,
		supportOPSign = false,
		fallback,
	}: UseConnectedActionOptions<P, V> = {}
): (...params: P) => Promise<V> {
	const callbackRef = React.useRef<Callback>();
	const isActive1 = useConnectModal((s) => s.isActive);
	const isActive2 = useWalletMintNewCharacterModal((s) => s.isActive);
	const isActive3 = useDynamicScenesModal((s) => s.isActive);
	const isActive = isActive1 || isActive2 || isActive3;
	const checkIsConnected = useCheckIsConnected();

	React.useEffect(() => {
		if (!isActive) {
			if (
				!noAutoResume &&
				callbackRef.current &&
				checkIsConnected({ connectType, supportOPSign })
			) {
				callbackRef.current();
			}

			callbackRef.current = undefined;
		}
	}, [isActive, connectType, noAutoResume, supportOPSign]);

	return useRefCallback(async (...params) => {
		if (checkIsConnected({ connectType, supportOPSign })) {
			return action(...params);
		} else if (fallback) {
			return fallback(...params);
		} else {
			return new Promise((resolve, reject) => {
				const { email, wallet } = useAccountState.getState();
				const isEmailConnected = !!email;
				const previousCharacterId = getCurrentCharacterId();
				const callback = () => {
					const currentCharacterId = getCurrentCharacterId();

					// Skip if the character has changed
					if (
						currentCharacterId &&
						previousCharacterId === currentCharacterId
					) {
						try {
							resolve(action(...params));
						} catch (e) {
							reject(e);
						}
					}
				};

				if (connectType === "wallet" && isEmailConnected) {
					// Email is connected but require wallet connection
					const emailCharacterId = email.characterId;

					callbackRef.current = () => {
						const walletCharacterId =
							useAccountState.getState().wallet?.characterId;

						// Check if the account upgrade has been completed.
						if (emailCharacterId === walletCharacterId) {
							callback();
						}
					};

					showUpgradeAccountModal();
				} else if (connectType !== "email" && wallet && !wallet?.characterId) {
					// Wallet is connected but no character
					callbackRef.current = callback;
					useWalletMintNewCharacterModal.getState().show();
				} else {
					callbackRef.current = callback;
					useConnectModal.getState().show();
				}
			});
		}
	});
}

function getCurrentCharacterId() {
	return useAccountState.getState().computed?.account?.characterId;
}
