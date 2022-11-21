import { SliceFn } from "../types";

export type PasswordSlice = {
	password: string;
	updatePassword: (password: string) => void;
};

export const createPasswordSlice: SliceFn<PasswordSlice> = (set, get) => ({
	password: "",

	updatePassword(password) {
		set({ password });
	},
});
