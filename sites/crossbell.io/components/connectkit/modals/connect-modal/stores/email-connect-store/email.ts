import { isEmail } from "@crossbell/util-validators";

import { SliceFn } from "../../../../utils";

export interface EmailSlice {
	email: string;
	emailErrorMsg: string;
	updateEmail: (email: string) => void;
	validateEmail: () => void;
}

export const createEmailSlice: SliceFn<EmailSlice> = (set, get) => ({
	email: "",
	emailErrorMsg: "",

	updateEmail(email) {
		set({ email: email.trim(), emailErrorMsg: "" });
	},

	validateEmail() {
		const { email } = get();
		const isEmailValid = !email || isEmail(email);
		set({ emailErrorMsg: isEmailValid ? "" : " * Invalid Email Format" });
	},
});
