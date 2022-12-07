import { showNotification } from "@mantine/notifications";
import create from "zustand";

import { isEmail } from "@crossbell/util-validators";

import { useAccountState } from "../../../../hooks";
import { connectByEmail } from "../../../../apis";
import { createContextStore } from "../../../../utils";

import { useModalStore } from "../modal-store";

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

				if (computed.isAbleToConnect && isEmail(email)) {
					set({ status: "connecting" });

					const result = await connectByEmail({ email, password });

					if (result.ok) {
						useAccountState
							.getState()
							.connectEmail(result.token)
							.then(() => {
								set({ status: "connected", emailErrorMsg: "" });
								notify.success(result.msg);
								useModalStore.getState().hide();
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
			},
		}))
	);
