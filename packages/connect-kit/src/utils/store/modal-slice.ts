import { SliceFn, OmitActions } from "../zustand-slice";

export interface ModalSlice {
	isActive: boolean;
	hide: () => void;
	show: () => void;
}

export const modalSlice: SliceFn<ModalSlice, OmitActions<ModalSlice>> = (
	set,
	get
) => ({
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
});
