import { isEmail } from "@/utils/validators/is-email";

import { SliceFn } from "../types";

export interface EmailSlice {
	email: string;
	emailErrorMsg: string;
	code: string;
	codeErrorMsg: string;
	codeCount: number;
	codeResendCountdown: number;
	updateEmail: (email: string) => void;
	updateCode: (code: string) => void;
	validateEmail: () => void;
}

export const createEmailSlice: SliceFn<EmailSlice> = (set, get) => ({
	email: "",
	emailErrorMsg: "",
	code: "",
	codeErrorMsg: "",
	codeCount: 6,
	codeResendCountdown: -1,

	updateEmail(email) {
		set({ email: email.trim(), emailErrorMsg: "" });
	},

	updateCode(code) {
		set({ code });
	},

	validateEmail() {
		const { email } = get();
		const isEmailValid = !email || isEmail(email);
		set({ emailErrorMsg: isEmailValid ? "" : " * Invalid Email Format" });
	},
});
