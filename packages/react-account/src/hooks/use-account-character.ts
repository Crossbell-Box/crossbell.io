import { useAccountState } from "./account-state";

export function useAccountCharacter() {
	return useAccountState((s) => s.computed.account?.character);
}
