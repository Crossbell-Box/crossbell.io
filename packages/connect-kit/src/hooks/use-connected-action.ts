import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";

import { useDynamicScenesModal } from "../components";
import { useConnectModal } from "../modals/connect-modal/stores";
import { showUpgradeAccountModal } from "../modals/upgrade-account-modal";
import { useWalletMintNewCharacterModal } from "../modals/wallet-mint-new-character/stores";

import { useAccountState } from "./account-state";

type Callback = () => void;
type ConnectType = "wallet" | "email" | "any";

const isConnected = (type: ConnectType): boolean => {
	const state = useAccountState.getState();

	switch (type) {
		case "email":
			return !!state.email;
		case "wallet":
			return !!state.wallet?.characterId && !state.email;
		case "any":
			return !!state.computed.account?.characterId;
	}
};

export type UseConnectedActionOptions<P extends any[] = unknown[], V = void> = {
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
	{ connectType = "any", fallback }: UseConnectedActionOptions<P, V> = {}
): (...params: P) => Promise<V> {
	const callbackRef = React.useRef<Callback>();
	const isActive1 = useConnectModal((s) => s.isActive);
	const isActive2 = useWalletMintNewCharacterModal((s) => s.isActive);
	const isActive3 = useDynamicScenesModal((s) => s.isActive);
	const isActive = isActive1 || isActive2 || isActive3;

	React.useEffect(() => {
		if (!isActive) {
			if (callbackRef.current && isConnected(connectType)) {
				callbackRef.current();
			}

			callbackRef.current = undefined;
		}
	}, [isActive, connectType]);

	return useRefCallback(async (...params) => {
		if (isConnected(connectType)) {
			return action(...params);
		} else if (fallback) {
			return fallback(...params);
		} else {
			return new Promise((resolve, reject) => {
				const { email, wallet } = useAccountState.getState();
				const isEmailConnected = !!email;
				const callback = () => {
					try {
						resolve(action(...params));
					} catch (e) {
						reject(e);
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
