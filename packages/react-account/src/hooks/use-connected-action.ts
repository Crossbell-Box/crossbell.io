import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { EMPTY, filter, from, map, Subject, switchMap } from "rxjs";
import { useAddress } from "@crossbell/contract";

import { useAccountState } from "./account-state";
import { useAccountCharacter } from "./use-account-character";
import { useIsOpSignEnabled } from "./operator-sign";
import { modalConfig } from "../modal-config";

type Callback = () => void;
type ConnectType = "wallet" | "email" | "any";

export type UseConnectedActionOptions<P extends any[] = unknown[], V = void> = {
	noAutoResume?: boolean;
	supportOPSign?: boolean;
	mustHaveCharacter?: boolean;
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
	options?: UseConnectedActionOptions<P, V>,
): (...params: P) => V;

export function useConnectedAction<P extends any[], V>(
	action: (...params: P) => V,
	options?: UseConnectedActionOptions<P, V>,
): (...params: P) => Promise<V>;

export function useConnectedAction<P extends any[], V>(
	action: (...params: P) => V,
	{
		connectType = "any",
		noAutoResume = false,
		supportOPSign = false,
		mustHaveCharacter = true,
		fallback,
	}: UseConnectedActionOptions<P, V> = {},
): (...params: P) => Promise<V> {
	const checkIsConnected = useCheckIsConnected({
		connectType,
		supportOPSign,
		mustHaveCharacter,
	});
	const { autoResume, resetAutoResume } = useAutoResume({
		noAutoResume,
		checkIsConnected,
	});

	return useRefCallback(async (...params) => {
		resetAutoResume();

		if (checkIsConnected()) {
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
					const ableToTriggerAction = ((): boolean => {
						if (currentCharacterId) {
							if (previousCharacterId) {
								// Make sure character hasn't changed
								return previousCharacterId === currentCharacterId;
							} else {
								// No previous character, trigger action
								return true;
							}
						} else {
							// Skip action if no character
							return false;
						}
					})();

					if (ableToTriggerAction) {
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

					autoResume(modalConfig.showUpgradeEmailAccountModal(), () => {
						const walletCharacterId =
							useAccountState.getState().wallet?.characterId;

						// Check if the account upgrade has been completed.
						if (emailCharacterId === walletCharacterId) {
							callback();
						}
					});
				} else if (connectType !== "email" && wallet && !wallet?.characterId) {
					// Wallet is connected but no character
					autoResume(modalConfig.showWalletMintNewCharacterModal(), callback);
				} else {
					autoResume(modalConfig.showConnectModal(), callback);
				}
			});
		}
	});
}

function useCheckIsConnected({
	connectType: type,
	supportOPSign,
	mustHaveCharacter,
}: {
	connectType: ConnectType;
	supportOPSign: boolean;
	mustHaveCharacter: boolean;
}) {
	const isWalletConnected = !!useAddress();
	const character = useAccountCharacter();
	const isOpSignEnabled = useIsOpSignEnabled(character);

	return useRefCallback((): boolean => {
		const state = useAccountState.getState();
		const isEmailAccountConnected = !!state.email;
		const isWalletAccountConnected = ((): boolean => {
			if (state.email) return false;
			if (mustHaveCharacter && !state.wallet?.characterId) return false;

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
	});
}

function getCurrentCharacterId() {
	return useAccountState.getState().computed?.account?.characterId;
}

function useAutoResume({
	noAutoResume = false,
	checkIsConnected,
}: {
	noAutoResume: boolean;
	checkIsConnected: () => boolean;
}) {
	const subjectRef =
		React.useRef<
			Subject<{ signal: Promise<unknown>; action: Callback } | null>
		>();

	if (!subjectRef.current) {
		subjectRef.current = new Subject();
	}

	React.useEffect(() => {
		const subscription = subjectRef.current
			?.pipe(
				switchMap((params) => {
					if (!params) return EMPTY;

					return from(params.signal).pipe(map(() => params.action));
				}),
				filter(() => (noAutoResume ? false : checkIsConnected())),
			)
			.subscribe((action) => action());

		return () => subscription?.unsubscribe();
	}, [noAutoResume]);

	return {
		autoResume: useRefCallback((signal: Promise<unknown>, action: Callback) => {
			subjectRef.current?.next({ signal, action });
		}),

		resetAutoResume: useRefCallback(() => {
			subjectRef.current?.next(null);
		}),
	};
}
