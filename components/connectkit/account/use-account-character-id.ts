import { useAccountStore } from "./account-store";

export function useAccountCharacterId() {
	return useAccountStore((s) => ({
		characterId: s.computed.account?.characterId,
		ssrReady: s.ssrReady,
	}));
}
