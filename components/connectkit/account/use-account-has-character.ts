import { useAccountStore } from "./account-store";

export function useAccountHasCharacter() {
	const account = useAccountStore((s) => s.computed.account);
	return !!account?.characterId;
}
