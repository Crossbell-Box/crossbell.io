import create from "zustand";

export type ModalState = {
	isModalActive: boolean;
	showModal: () => void;
	hideModal: () => void;
};

export const useModalState = create<ModalState>((set) => ({
	isModalActive: true,

	showModal() {
		set({ isModalActive: true });
	},

	hideModal() {
		set({ isModalActive: false });
	},
}));
