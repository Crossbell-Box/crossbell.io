import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createStorage } from "../../storage-config";
import { getNeedSSR } from "../../ssr-config";

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

const ACCOUNT_STATE_STORAGE_KEY = "connect-kit:account";

export type AccountState = AccountSlices & {
	ssrReady: boolean;

	computed: {
		account: GeneralAccount | null;
	};

	markSSRReady(): void;
	refresh(): Promise<void>;

	_syncFromLocalStorage(): void;
};

export const useAccountState = create(
	persist<AccountState, [], [], Omit<AccountState, "computed" | "ssrReady">>(
		(set, get) => ({
			...createEmailAccountSlice(set, get),
			...createWalletAccountSlice(set, get),

			ssrReady: !getNeedSSR(),

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

			_syncFromLocalStorage() {
				try {
					const { state } = JSON.parse(
						localStorage.getItem(ACCOUNT_STATE_STORAGE_KEY) || "{}",
					);

					if (state) {
						set(state);
					}
				} catch (e) {
					console.error("syncFromLocalStorageError:", e);
				}
			},
		}),
		{
			name: ACCOUNT_STATE_STORAGE_KEY,
			partialize: ({ computed: _, ssrReady: __, ...state }) => state,
			storage: createStorage(),
		},
	),
);
