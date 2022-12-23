import create from "zustand";
import { SupportedPlatform } from "@crossbell/connect-kit";

type Meta = {
	platform: SupportedPlatform;
	identity: string;
};

export type UnbindModalState = {
	isActive: boolean;
	meta: Meta | null;

	show: (meta: Meta) => void;
	hide: () => void;
};

export const useUnbindModalState = create<UnbindModalState>((set) => ({
	isActive: false,
	meta: null,

	show(meta: Meta) {
		set({ isActive: true, meta });
	},

	hide() {
		set({ isActive: false });
	},
}));
