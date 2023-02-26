import { create } from "zustand";
import React from "react";

import {
	modalSlice,
	ModalSlice,
	scenesSlice,
	ScenesSlice,
	SceneType,
} from "../../../utils";

type Scene = SceneType<string, { Component: React.ComponentType }>;

export type UseDynamicScenesModal = Omit<
	ModalSlice & ScenesSlice<Scene>,
	"show"
> & {
	show: (scene: Scene) => void;
};

const defaultScene: Scene = {
	kind: "default",
	Component: () => null,
};

export const useDynamicScenesModal = create<UseDynamicScenesModal>(
	(setState, getState) => {
		const modal = modalSlice(setState, getState);
		const scenes = scenesSlice(defaultScene)(setState, getState);

		return {
			...modal,
			...scenes,

			show(scene) {
				scenes.resetScenes([scene]);
				modal.show();
			},
		};
	}
);
