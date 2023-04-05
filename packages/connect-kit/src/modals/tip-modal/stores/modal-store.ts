import { create } from "zustand";

import { modalSlice, ModalSlice } from "../../../utils";

type TipInfo = {
	characterId?: number;
	noteId?: number;
};

export type TipModal = Omit<ModalSlice, "show"> &
	TipInfo & {
		show: (params: TipInfo) => void;
	};

export const useTipModal = create<TipModal>((set, get) => ({
	...modalSlice(set, get),

	isActive: false,

	show({ characterId, noteId }) {
		if (characterId) {
			set({ characterId, noteId, isActive: true });
		}
	},
}));
