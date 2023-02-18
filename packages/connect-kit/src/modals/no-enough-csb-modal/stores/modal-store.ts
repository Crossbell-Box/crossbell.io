import { create } from "zustand";

import { modalSlice, ModalSlice } from "../../../utils";

export type UseNoEnoughCSBModalKind = "claim-csb" | "transfer-csb-to-operator";

type BaseStore = {
	kind: UseNoEnoughCSBModalKind;
	show: (kind: UseNoEnoughCSBModalKind) => void;
};

export type UseNoEnoughCSBModal = Omit<ModalSlice, keyof BaseStore> & BaseStore;

export const useNoEnoughCSBModal = create<UseNoEnoughCSBModal>((set, get) => ({
	...modalSlice(set, get),

	kind: "claim-csb",

	show(kind) {
		set({ kind, isActive: true });
	},
}));
