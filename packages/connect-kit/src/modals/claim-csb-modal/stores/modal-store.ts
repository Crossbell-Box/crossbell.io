import create from "zustand";

export interface ModalStore {
	msg: string;
	isActive: boolean;
	hide: () => void;
	show: (msg: string) => void;
}

export const useClaimCSBModal = create<ModalStore>((set, get) => ({
	msg: "",
	isActive: false,

	hide: () => {
		const { isActive } = get();

		if (isActive) {
			set({ isActive: false });
		}
	},

	show: (msg: string) => {
		const { isActive } = get();

		if (!isActive) {
			set({ isActive: true, msg });
		}
	},
}));
