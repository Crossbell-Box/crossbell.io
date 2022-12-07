import { SliceFn } from "../../../../utils";

export type PasswordSlice = {
	password: string;
	updatePassword: (password: string) => void;
};

export const createPasswordSlice: SliceFn<PasswordSlice> = (set) => ({
	password: "",

	updatePassword(password) {
		set({ password });
	},
});
