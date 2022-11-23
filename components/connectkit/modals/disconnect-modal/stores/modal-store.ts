import create from "zustand";

export interface ModalStore {
	isActive: boolean;
	hide: () => void;
	show: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
	isActive: false,

	hide: () => {
		const { isActive } = get();

		if (isActive) {
			set({ isActive: false });
		}
	},

	show: () => {
		const { isActive } = get();

		if (!isActive) {
			set({ isActive: true });
		}
	},
}));
