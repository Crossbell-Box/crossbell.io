import create from "zustand";
import { immer } from "zustand/middleware/immer";

import { createContextStore } from "../../../utils";

import { SceneKind, Scene, SceneWithoutContext } from "../types";

export interface ScenesStore {
	scenes: Scene[];
	goTo: (scene: Scene | SceneWithoutContext["kind"]) => void;
	goBack: () => void;
	reset: () => void;
	resetScenes: (scenes: Scene[]) => void;

	computed: {
		currentScene: Scene;
		isAbleToGoBack: boolean;
	};
}

export const [ScenesStoreProvider, useScenesStore] = createContextStore(() =>
	create(
		immer<ScenesStore>((set, get) => ({
			scenes: [{ kind: SceneKind.selectConnectKind }],

			goTo(scene) {
				set(({ scenes }) => {
					if (typeof scene === "string") {
						scenes.push({ kind: scene });
					} else {
						scenes.push(scene);
					}
				});
			},

			goBack() {
				set(({ scenes }) => {
					if (scenes.length > 1) {
						scenes.pop();
					}
				});
			},

			reset() {
				set({ scenes: [{ kind: SceneKind.selectConnectKind }] });
			},

			resetScenes(scenes) {
				set({ scenes });
			},

			computed: {
				get currentScene() {
					const { scenes } = get();
					return scenes[scenes.length - 1];
				},

				get isAbleToGoBack() {
					const { scenes } = get();
					return scenes.length < 2;
				},
			},
		}))
	)
);
