import { create } from "zustand";

import { createContextStore, scenesSlice, ScenesSlice } from "../../../utils";

import { Scene, SceneKind } from "../types";

export type ScenesStore = ScenesSlice<Scene>;

export const [ScenesStoreProvider, useScenesStore] = createContextStore(() =>
	create<ScenesStore>((set, get) => ({
		...scenesSlice<Scene>({ kind: SceneKind.claimCSB })(set, get),
	}))
);
