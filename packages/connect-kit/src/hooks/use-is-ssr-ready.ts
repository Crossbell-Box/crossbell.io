import { useAccountState } from "@crossbell/connect-kit";

export function useIsSsrReady(): boolean {
	return useAccountState((s) => s.ssrReady);
}
