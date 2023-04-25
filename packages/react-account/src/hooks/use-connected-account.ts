import {
	GeneralAccount,
	EmailAccount,
	WalletAccount,
	useAccountState,
} from "./account-state";

export function useConnectedAccount(type: "email"): EmailAccount | null;
export function useConnectedAccount(type: "wallet"): WalletAccount | null;
export function useConnectedAccount(
	type?: GeneralAccount["type"]
): GeneralAccount | null;
export function useConnectedAccount(
	type?: GeneralAccount["type"]
): GeneralAccount | null {
	return useAccountState((s) => {
		switch (type) {
			case "email":
				return s.email;
			case "wallet":
				return s.email ? null : s.wallet;
			default:
				return s.computed.account;
		}
	});
}
