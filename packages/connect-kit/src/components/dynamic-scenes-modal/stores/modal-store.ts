import { create } from "zustand";
import { useRefCallback } from "@crossbell/util-hooks";

import { modalSlice, ModalSlice } from "../../../utils";
import { DynamicScene, useScenesStore, ScenesStore } from "./scenes-store";

const _useDynamicScenesModal = create<ModalSlice>(modalSlice);

export type UseDynamicScenesModal = ModalSlice & {
	scenes: ScenesStore;
};

export function useDynamicScenesModal(): Omit<UseDynamicScenesModal, "show">;
export function useDynamicScenesModal(
	defaultScene: DynamicScene
): UseDynamicScenesModal;
export function useDynamicScenesModal(defaultScene?: DynamicScene) {
	const modal = _useDynamicScenesModal();
	const scenes = useScenesStore();

	const show = useRefCallback(() => {
		if (defaultScene) {
			scenes.resetScenes([defaultScene]);
			modal.show();
		}
	});

	return { ...modal, show, scenes };
}
