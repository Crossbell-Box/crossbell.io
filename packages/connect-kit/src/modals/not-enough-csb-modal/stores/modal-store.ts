import create from "zustand";

import { modalSlice, ModalSlice } from "../../../utils";

export type ModalStore = Omit<ModalSlice, "show"> & {
	msg: string;
	show: (msg: string) => void;
};

export const useNotEnoughCSBModal = create<ModalStore>((set, get) => ({
	...modalSlice(set, get),

	msg: "",

	show(msg: string) {
		const { isActive } = get();

		if (!isActive) {
			set({ isActive: true, msg });
		}
	},
}));
