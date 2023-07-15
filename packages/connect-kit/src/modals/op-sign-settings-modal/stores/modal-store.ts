import { create } from "zustand";

import { modalSlice, ModalSlice } from "../../../utils";

export type OpSignSettingsModal = Omit<ModalSlice, "show"> & {
	characterId?: number;
	show: (params: { characterId: number }) => void;
};

export const useOpSignSettingsModal = create<OpSignSettingsModal>(
	(set, get) => ({
		...modalSlice(set, get),

		show({ characterId }) {
			set({ characterId, isActive: true });
		},
	}),
);
