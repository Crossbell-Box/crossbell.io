import { showNotification } from "@mantine/notifications";
import { create } from "zustand";
import { useAccountState } from "@crossbell/react-account";
import { isEmail, createContextStore } from "@crossbell/react-account/utils";
import {
	registerSendCodeToEmail,
	registerByEmail,
	registerVerifyEmailCode,
} from "@crossbell/react-account/apis";

import { createEmailSlice, EmailSlice } from "./email";
import { createPasswordSlice, PasswordSlice } from "./password";
import { createCharacterSlice, CharacterSlice } from "./character";
import { isValidPasswordFormat } from "./password.strength";

export type EmailRegisterStore = EmailSlice &
	PasswordSlice &
	CharacterSlice & {
		status:
			| "idle"
			| "sending-code"
			| "verifying-code"
			| "registering"
			| "registered";
		isCodeSent: boolean;

		computed: {
			canSendCode: boolean;
			canVerifyCode: boolean;
			canGoToStep3: boolean;
			canRegister: boolean;
			isPending: boolean;
			isValidCodeFormat: boolean;
		};

		sendCode: () => Promise<void>;
		verifyCode: () => Promise<boolean>;
		register: () => Promise<boolean>;
	};

export const [EmailRegisterStoreProvider, useEmailRegisterStore] =
	createContextStore(() =>
		create<EmailRegisterStore>((set, get) => ({
			status: "idle",
			isCodeSent: false,

			...createEmailSlice(set, get),
			...createPasswordSlice(set, get),
			...createCharacterSlice(set, get),

			computed: {
				get canSendCode() {
					const { email, computed, codeResendCountdown } = get();
					return (
						isEmail(email) && !computed.isPending && codeResendCountdown < 1
					);
				},

				get canVerifyCode() {
					const { email, code, codeCount, computed } = get();
					return (
						!computed.isPending && code.length === codeCount && isEmail(email)
					);
				},

				get canGoToStep3() {
					const { password, password2, isPolicyChecked } = get();

					return (
						isValidPasswordFormat(password) &&
						password === password2 &&
						isPolicyChecked
					);
				},

				get canRegister() {
					const { computed, characterName } = get();

					return (
						computed.canVerifyCode &&
						computed.canGoToStep3 &&
						!!characterName.trim()
					);
				},

				get isCodeSent() {
					return get().codeResendCountdown >= 0;
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
						const { ok, msg } = await registerSendCodeToEmail(email);

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

			async register() {
				const { email, code, password, characterName, computed } = get();

				if (
					!computed.isPending &&
					computed.isValidCodeFormat &&
					isEmail(email)
				) {
					set({ status: "registering" });

					const { ok, msg, token } = await registerByEmail({
						email,
						emailVerifyCode: code,
						password,
						characterName,
					});

					set({ status: ok ? "registered" : "idle" });

					if (ok) {
						const connectOk = await useAccountState
							.getState()
							.connectEmail(token);

						if (connectOk) {
							showNotification({
								color: "green",
								message: msg,
								title: "Register",
							});
						}

						return connectOk;
					} else {
						showNotification({
							color: "red",
							message: msg,
							title: "Register",
						});
						return false;
					}
				} else {
					return false;
				}
			},

			async verifyCode() {
				const { email, code, computed } = get();

				if (computed.canVerifyCode) {
					set({ status: "verifying-code" });

					const { ok, msg } = await registerVerifyEmailCode({
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
		})),
	);
