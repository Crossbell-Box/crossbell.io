import { create } from "zustand";
import { createContextStore } from "@crossbell/react-account/utils";

import { scenesSlice, ScenesSlice } from "../../../utils";
import { SignInStrategy } from "../../../connect-kit-config";

import { Scene, SceneKind } from "../types";

export type ScenesStore = ScenesSlice<Scene> & {
	signInStrategy: SignInStrategy;
	setSignInStrategy: (strategy: SignInStrategy) => void;
};

export const [ScenesStoreProvider, useScenesStore] = createContextStore(() =>
	create<ScenesStore>((set, get) => {
		function reset() {
			const strategies: Record<SignInStrategy, () => void> = {
				complete() {
					set({ scenes: [{ kind: SceneKind.selectConnectKind }] });
				},

				simple() {
					set({
						scenes: [
							{ kind: SceneKind.selectConnectKind },
							{ kind: SceneKind.selectWalletToConnect },
						],
					});
				},
			};

			strategies[get().signInStrategy]();
		}

		return {
			...scenesSlice<Scene>({ kind: SceneKind.selectConnectKind })(set, get),

			reset,

			signInStrategy: "complete",

			setSignInStrategy(signInStrategy) {
				set({ signInStrategy });
				reset();
			},
		};
	})
);
