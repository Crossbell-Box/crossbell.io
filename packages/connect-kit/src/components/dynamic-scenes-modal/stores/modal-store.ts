import { create } from "zustand";
import React from "react";

import {
	modalSlice,
	ModalSlice,
	scenesSlice,
	ScenesSlice,
	SceneType,
	waitUntilModalClosed,
} from "../../../utils";
import { useRefCallback } from "@crossbell/util-hooks";

type Scene = SceneType<string, { Component: React.ComponentType }>;

export type UseDynamicScenesModal = Omit<
	ModalSlice & ScenesSlice<Scene>,
	"show"
> & {
	id: string;
	show: (id: string, scene: Scene) => void;
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

			id: "",

			show(id, scene) {
				setState({ id });
				scenes.resetScenes([scene]);
				modal.show();
			},
		};
	}
);

export function createDynamicScenesModal(id: string, scene: Scene) {
	function showModal() {
		useDynamicScenesModal.getState().show(id, scene);

		return waitUntilModalClosed(
			useDynamicScenesModal,
			(s) => s.id === id && !s.isActive
		);
	}

	function useModal(): ModalSlice {
		const [isActive, hide, show_] = useDynamicScenesModal((s) => [
			s.id === id && s.isActive,
			s.hide,
			s.show,
		]);

		const show = useRefCallback(() => show_(id, scene));

		return { isActive, hide, show };
	}

	return { useModal, showModal };
}
