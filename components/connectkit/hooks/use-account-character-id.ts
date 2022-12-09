import { useAccountState } from "./account-state";

export function useAccountCharacterId() {
	return useAccountState((s) => ({
		characterId: s.computed.account?.characterId,
		ssrReady: s.ssrReady,
	}));
}
