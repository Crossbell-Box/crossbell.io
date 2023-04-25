import { create } from "zustand";
import { NoEnoughCSBKind } from "@crossbell/react-account";

import { modalSlice, ModalSlice } from "../../../utils";

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
