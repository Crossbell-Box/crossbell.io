import { create } from "zustand";

import { modalSlice, ModalSlice } from "../../../utils";
import { NoEnoughCSBKind } from "../../../hooks";

type BaseStore = {
	kind: NoEnoughCSBKind;
	show: (kind: NoEnoughCSBKind) => void;
};

export type UseNoEnoughCSBModal = Omit<ModalSlice, keyof BaseStore> & BaseStore;

export const useNoEnoughCSBModal = create<UseNoEnoughCSBModal>((set, get) => ({
	...modalSlice(set, get),

	kind: "claim-csb",

	show(kind) {
		set({ kind, isActive: true });
	},
}));
