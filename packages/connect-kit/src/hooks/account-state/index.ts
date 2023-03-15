import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
	createEmailAccountSlice,
	EmailAccount,
	EmailAccountSlice,
} from "./email";

import {
	createWalletAccountSlice,
	WalletAccount,
	WalletAccountSlice,
} from "./wallet";

export type { EmailAccount, WalletAccount };
export type GeneralAccount = EmailAccount | WalletAccount;

type AccountSlices = EmailAccountSlice & WalletAccountSlice;

export type AccountState = AccountSlices & {
	ssrReady: boolean;

	computed: {
		account: GeneralAccount | null;
	};

	markSSRReady(): void;
	refresh(): Promise<void>;
};

export const useAccountState = create(
	persist<AccountState, [], [], Omit<AccountState, "computed" | "ssrReady">>(
		(set, get) => ({
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

			async refresh() {
				const { refreshEmail, refreshWallet } = get();
				await Promise.all([refreshEmail(), refreshWallet()]);
			},
		}),
		{
			name: "connect-kit:account",
			partialize: ({ computed: _, ssrReady: __, ...state }) => state,
		}
	)
);
