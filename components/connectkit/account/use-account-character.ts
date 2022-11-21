import { useCharacter } from "@/utils/apis/indexer";

import { useAccountStore } from "./account-store";

export function useAccountCharacter() {
	const account = useAccountStore((s) => s.computed.account);
	return useCharacter(account?.characterId);
}
