import { useAccountState } from "./account-state";

export function useIsWalletSignedIn() {
	return useAccountState((s) => !!s.wallet?.siwe);
}
