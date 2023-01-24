import create from "zustand";

import { modalSlice, ModalSlice } from "../../../utils";

export type ConnectModalStore = ModalSlice & {
	canHide: boolean;
	setCanHide: (canHide: boolean) => void;
};

export const useConnectModal = create<ConnectModalStore>((set, get) => ({
	...modalSlice(set, get),

	canHide: true,

	hide: () => {
		const { isActive, canHide } = get();

		if (isActive && canHide) {
			set({ isActive: false });
		}
	},

	setCanHide(canHide: boolean) {
		set({ canHide });
	},
}));
