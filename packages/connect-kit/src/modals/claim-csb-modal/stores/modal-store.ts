import create from "zustand";

import { modalSlice, ModalSlice } from "../../../utils/store/modal-slice";

export type ModalStore = Omit<ModalSlice, "show"> & {
	msg: string;
	show: (msg: string) => void;
};

export const useClaimCSBModal = create<ModalStore>((set, get) => ({
	...modalSlice(set, get),

	msg: "",

	show(msg: string) {
		const { isActive } = get();

		if (!isActive) {
			set({ isActive: true, msg });
		}
	},
}));
