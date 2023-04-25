import { useAccountState } from "./account-state";

export function useIsSsrReady(): boolean {
	return useAccountState((s) => s.ssrReady);
}
