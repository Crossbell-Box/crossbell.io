import { useAccountState } from "./account-state";

export function useAccountHasCharacter() {
	return useAccountState((s) => ({
		hasCharacter: !!s.computed.account?.characterId,
		ssrReady: s.ssrReady,
	}));
}
