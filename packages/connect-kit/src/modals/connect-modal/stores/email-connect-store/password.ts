import { SliceFn } from "@crossbell/react-account/utils";

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
