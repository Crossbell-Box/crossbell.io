import { SliceFn } from "../../../../utils";

import { checkStrength } from "./password.strength";

export type PasswordMsg = {
	value: string;
	color: string;
};

export interface PasswordSlice {
	password: string;
	passwordMsg: PasswordMsg;
	password2: string;
	password2Msg: PasswordMsg;
	isPolicyChecked: boolean;
	updatePassword: (password: string) => void;
	updatePassword2: (password2: string) => void;
	validatePassword2: () => void;
	toggleCheckPolicy: () => void;
}

const PasswordMsg = {
	empty: { value: "", color: "#FFB74D" },
	invalidPassword: { value: " * 8 or more characters", color: "#E65040" },
	weakPassword: { value: " * Weak Password", color: "#E65040" },
	moderatePassword: { value: " * Moderate Password", color: "#FFB74D" },
	strongPassword: { value: " * Strong Password", color: "#6AD991" },
	noMatch: { value: " * Didn't Match", color: "#E65040" },
	match: { value: " * Match", color: "#6AD991" },
};

export const createPasswordSlice: SliceFn<PasswordSlice> = (set, get) => ({
	password: "",
	passwordMsg: PasswordMsg.empty,
	password2: "",
	password2Msg: PasswordMsg.empty,
	password2ErrorMsg: "",
	isPolicyChecked: false,

	updatePassword(password) {
		const state = { password, password2Msg: PasswordMsg.empty };

		switch (checkStrength(password)) {
			case 0:
				return set({
					...state,
					passwordMsg: PasswordMsg.invalidPassword,
				});
			case 1:
				return set({
					...state,
					passwordMsg: PasswordMsg.weakPassword,
				});
			case 2:
				return set({
					...state,
					passwordMsg: PasswordMsg.moderatePassword,
				});
			case 3:
				return set({
					...state,
					passwordMsg: PasswordMsg.strongPassword,
				});
		}
	},

	updatePassword2(password2) {
		set({ password2, password2Msg: PasswordMsg.empty });
	},

	validatePassword2() {
		const { password, password2 } = get();

		if (password2) {
			set({
				password2Msg:
					password === password2 ? PasswordMsg.match : PasswordMsg.noMatch,
			});
		} else {
			set({ password2Msg: PasswordMsg.empty });
		}
	},

	toggleCheckPolicy() {
		set({ isPolicyChecked: !get().isPolicyChecked });
	},
});
