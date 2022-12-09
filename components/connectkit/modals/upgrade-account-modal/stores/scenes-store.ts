import create from "zustand";
import { immer } from "zustand/middleware/immer";

import { createContextStore } from "../../../utils";

import { SceneKind, Scene } from "../types";

export interface ScenesStore {
	scenes: Scene[];
	goTo: (scene: Scene["kind"]) => void;
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
			scenes: [{ kind: SceneKind.selectOptions }],

			goTo(scene) {
				set(({ scenes }) => {
					scenes.push({ kind: scene });
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
				set({ scenes: [{ kind: SceneKind.selectOptions }] });
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
