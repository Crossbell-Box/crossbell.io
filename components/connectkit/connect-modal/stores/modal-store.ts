import create from "zustand";

export interface ModalStore {
	isActive: boolean;
	hide: () => void;
	show: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
	isActive: false,

	hide: () => {
		set({ isActive: false });
	},

	show: () => {
		set({ isActive: true });
	},
}));
