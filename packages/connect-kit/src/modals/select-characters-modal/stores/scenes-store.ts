import { create } from "zustand";
import { createContextStore } from "@crossbell/react-account/utils";

import { scenesSlice, ScenesSlice } from "../../../utils";

import { SceneKind, Scene } from "../types";

export type ScenesStore = ScenesSlice<Scene>;

export const [ScenesStoreProvider, useScenesStore] = createContextStore(() =>
	create<ScenesStore>((set, get) => ({
		...scenesSlice<Scene>({ kind: SceneKind.selectCharacters })(set, get),
	})),
);
