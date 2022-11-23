import { useCharacter } from "@/utils/apis/indexer";

import { useAccountState } from "./account-state";

export function useAccountCharacter() {
	const account = useAccountState((s) => s.computed.account);
	return useCharacter(account?.characterId);
}
