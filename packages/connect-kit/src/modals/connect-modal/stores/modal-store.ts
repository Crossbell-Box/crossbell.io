import create from "zustand";

export interface ModalStore {
	isActive: boolean;
	canHide: boolean;
	hide: () => void;
	show: () => void;
	setCanHide: (canHide: boolean) => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
	isActive: false,
	canHide: true,

	hide: () => {
		const { isActive, canHide } = get();

		if (isActive && canHide) {
			set({ isActive: false });
		}
	},

	show: () => {
		const { isActive } = get();

		if (!isActive) {
			set({ isActive: true });
		}
	},

	setCanHide(canHide: boolean) {
		set({ canHide });
	},
}));
