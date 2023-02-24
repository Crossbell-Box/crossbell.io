import { create } from "zustand";
import { useRefCallback } from "@crossbell/util-hooks";

import { modalSlice, ModalSlice } from "../../../utils";
import { DynamicScene, useScenesStore } from "./scenes-store";

const _useDynamicScenesModal = create<ModalSlice>(modalSlice);

export function useDynamicScenesModal(): Omit<ModalSlice, "show">;
export function useDynamicScenesModal(defaultScene: DynamicScene): ModalSlice;
export function useDynamicScenesModal(defaultScene?: DynamicScene) {
	const modal = _useDynamicScenesModal();

	const show = useRefCallback(() => {
		if (defaultScene) {
			useScenesStore.getState().resetScenes([defaultScene]);
			modal.show();
		}
	});

	return { ...modal, show };
}
