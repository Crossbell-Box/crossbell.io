import React from "react";
import { create } from "zustand";

import { scenesSlice, ScenesSlice, SceneType } from "../../../utils";

export type DynamicScene = SceneType<
	string,
	{ Component: React.ComponentType }
>;
export type ScenesStore = ScenesSlice<DynamicScene>;

export const useScenesStore = create<ScenesStore>((set, get) =>
	scenesSlice<DynamicScene>({ kind: "empty", Component: () => null })(set, get)
);
