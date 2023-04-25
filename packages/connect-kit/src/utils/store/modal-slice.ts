import { UseBoundStore, StoreApi } from "zustand";

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

export function waitUntilModalClosed<S extends Pick<ModalSlice, "isActive">>(
	modal: UseBoundStore<StoreApi<S>>
): Promise<void>;

export function waitUntilModalClosed<S>(
	modal: UseBoundStore<StoreApi<S>>,
	checkIsClosed: (state: S) => boolean
): Promise<void>;

export function waitUntilModalClosed<S extends Pick<ModalSlice, "isActive">>(
	modal: UseBoundStore<StoreApi<S>>,
	checkIsClosed: (state: S) => boolean = (s) => !s.isActive
) {
	return new Promise<void>((resolve) => {
		const isClosed = checkIsClosed(modal.getState());

		if (isClosed) return;

		const dispose = modal.subscribe((state) => {
			if (checkIsClosed(state)) {
				resolve();
				dispose();
			}
		});
	});
}
