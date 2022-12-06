import { showNotification } from "@mantine/notifications";
import create from "zustand";

import { isEmail } from "@/utils/validators/is-email";

import {
	resetPasswordByEmail,
	resetPasswordSendCodeToEmail,
	resetPasswordVerifyEmailCode,
} from "../../../../apis";
import { createContextStore } from "../../../../utils";

import { createEmailSlice, EmailSlice } from "../email-register-store/email";
import {
	createPasswordSlice,
	PasswordSlice,
} from "../email-register-store/password";
import { isValidPasswordFormat } from "../email-register-store/password.strength";

export type ResetPasswordStore = EmailSlice &
	PasswordSlice & {
		status: "idle" | "sending-code" | "verifying-code" | "resetting" | "reset";
		isCodeSent: boolean;

		computed: {
			canSendCode: boolean;
			canVerifyCode: boolean;
			canReset: boolean;
			isPending: boolean;
			isValidCodeFormat: boolean;
		};

		sendCode: () => Promise<void>;
		verifyCode: () => Promise<boolean>;
		resetPassword: () => Promise<boolean>;
		resetStore: () => void;
	};

export const [
	ResetPasswordStoreProvider,
	useResetPasswordStore,
	useResetResetPasswordStore,
] = createContextStore(() => {
	return create<ResetPasswordStore>((set, get) => ({
		status: "idle",
		isCodeSent: false,

		...createEmailSlice(set, get),
		...createPasswordSlice(set, get),

		computed: {
			get canSendCode() {
				const { email, computed, codeResendCountdown } = get();
				return isEmail(email) && !computed.isPending && codeResendCountdown < 1;
			},

			get canVerifyCode() {
				const { email, computed } = get();

				return (
					!computed.isPending && computed.isValidCodeFormat && isEmail(email)
				);
			},

			get canReset() {
				const { password, password2, computed } = get();

				return (
					computed.canVerifyCode &&
					isValidPasswordFormat(password) &&
					password === password2
				);
			},

			get isPending() {
				return get().status !== "idle";
			},

			get isValidCodeFormat() {
				const { code, codeCount } = get();
				return code.length === codeCount;
			},
		},

		async sendCode() {
			const { email, codeResendCountdown, computed } = get();

			if (!computed.isPending && isEmail(email) && codeResendCountdown < 1) {
				set({ status: "sending-code" });

				try {
					const { ok, msg } = await resetPasswordSendCodeToEmail(email);

					set({
						status: "idle",
						emailErrorMsg: ok ? "" : msg,
						codeResendCountdown: ok ? 60 : 0,
						isCodeSent: get().isCodeSent || ok,
					});

					const intervalId = setInterval(() => {
						const countdown = get().codeResendCountdown;

						if (countdown <= 1) {
							clearInterval(intervalId);
						}

						set({ codeResendCountdown: countdown - 1 });
					}, 1000);
				} catch (err) {
					set({ status: "idle" });
					showNotification({
						color: "red",
						message: `${err}`,
						title: "Error while sending email",
					});
				}
			}
		},

		async resetPassword() {
			const { email, code, password, computed } = get();

			if (computed.canReset) {
				set({ status: "resetting" });

				const { ok, msg } = await resetPasswordByEmail({
					email,
					emailVerifyCode: code,
					password,
				});

				set({ status: ok ? "reset" : "idle" });

				if (!ok) {
					showNotification({
						color: "red",
						message: msg,
						title: "Reset password",
					});
				}

				return ok;
			} else {
				return false;
			}
		},

		async verifyCode() {
			const { email, code, computed } = get();

			if (computed.canVerifyCode) {
				set({ status: "verifying-code" });

				const { ok, msg } = await resetPasswordVerifyEmailCode({
					email,
					code,
				});

				set({
					status: "idle",
					codeErrorMsg: ok ? "" : msg,
				});

				return ok;
			}

			return false;
		},

		resetStore() {
			const { computed } = get();

			if (!computed.isPending) {
				set({});
			}
		},
	}));
});
