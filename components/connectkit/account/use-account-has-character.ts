import { useAccountStore } from "./account-store";

export function useAccountHasCharacter() {
	return useAccountStore((s) => ({
		hasCharacter: !!s.computed.account?.characterId,
		ssrReady: s.ssrReady,
	}));
}
