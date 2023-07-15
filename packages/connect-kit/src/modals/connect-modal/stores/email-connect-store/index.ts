import { showNotification } from "@mantine/notifications";
import { create } from "zustand";
import { useAccountState } from "@crossbell/react-account";
import { isEmail, createContextStore } from "@crossbell/react-account/utils";
import { connectByEmail } from "@crossbell/react-account/apis";

import { useConnectModal } from "../modal-store";

import { EmailSlice, createEmailSlice } from "./email";
import { PasswordSlice, createPasswordSlice } from "./password";

export type EmailConnectStore = EmailSlice &
	PasswordSlice & {
		status: "idle" | "connecting" | "connected";
		connect: () => Promise<void>;

		computed: {
			isPending: boolean;
			isAbleToConnect: boolean;
		};
	};

const notify = {
	success(msg: string) {
		showNotification({
			color: "green",
			message: msg,
			title: "Connect by email",
		});
	},

	error(msg: string) {
		showNotification({
			color: "red",
			message: msg,
			title: "Connect by email",
		});
	},
};

export const [EmailConnectStoreProvider, useEmailConnectStore] =
	createContextStore(() =>
		create<EmailConnectStore>((set, get) => ({
			status: "idle",

			...createEmailSlice(set, get),
			...createPasswordSlice(set, get),

			computed: {
				get isPending() {
					return get().status !== "idle";
				},

				get isAbleToConnect() {
					const { email, password, computed } = get();
					return !!password && isEmail(email) && !computed.isPending;
				},
			},

			async connect() {
				const { email, password, computed } = get();

				try {
					if (computed.isAbleToConnect && isEmail(email)) {
						set({ status: "connecting" });

						const result = await connectByEmail({ email, password });

						if (result.ok) {
							useAccountState
								.getState()
								.connectEmail(result.token)
								.then((success) => {
									if (success) {
										set({ status: "connected", emailErrorMsg: "" });
										notify.success(result.msg);
										useConnectModal.getState().hide();
									}
								});
						} else {
							if (result.msg.toLowerCase() === "user not found") {
								const msg = "Haven't Registered yet";
								set({ status: "idle", emailErrorMsg: msg });
								notify.error(msg);
							} else {
								set({ status: "idle", emailErrorMsg: "" });
								notify.error(result.msg);
							}
						}
					}
				} catch (e) {
					set({ status: "idle", emailErrorMsg: "" });
					notify.error(e instanceof Error ? e.message : `${e}`);
				}
			},
		})),
	);
