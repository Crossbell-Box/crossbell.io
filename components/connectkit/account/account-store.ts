import create from "zustand";
import { persist } from "zustand/middleware";

import {
	createEmailAccountSlice,
	EmailAccount,
	EmailAccountSlice,
} from "./account-store.email";

import {
	createWalletAccountSlice,
	WalletAccount,
	WalletAccountSlice,
} from "./account-store.wallet";

export type GeneralAccount = EmailAccount | WalletAccount;

type AccountSlices = EmailAccountSlice & WalletAccountSlice;

export type AccountStore = AccountSlices & {
	ssrReady: boolean;

	computed: {
		account: GeneralAccount | null;
	};

	markSSRReady(): void;
};

const defaultState = {
	email: null,
	wallet: null,
} as const;

export const useAccountStore = create(
	persist<AccountStore, [], [], Omit<AccountStore, "computed" | "ssrReady">>(
		(set, get) => ({
			...defaultState,
			...createEmailAccountSlice(set, get),
			...createWalletAccountSlice(set, get),
			ssrReady: false,

			computed: {
				get account() {
					const { email, wallet, ssrReady } = get();

					if (ssrReady) {
						return email ?? wallet ?? null;
					} else {
						return null;
					}
				},
			},

			markSSRReady() {
				set({ ssrReady: true });
			},
		}),
		{
			name: "connect-kit:account",
			partialize: ({ computed: _, ssrReady: __, ...state }) => state,
		}
	)
);
