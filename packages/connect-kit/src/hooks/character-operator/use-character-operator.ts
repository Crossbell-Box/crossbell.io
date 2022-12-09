import { useQuery } from "@tanstack/react-query";
import { indexer } from "@crossbell/indexer";

import { useAccountState } from "../account-state";

import { SCOPE_KEY_CHARACTER_OPERATOR } from "./const";

export function useCharacterOperator(operatorAddress: string) {
	const account = useAccountState((s) => s.computed.account);

	return useQuery(
		SCOPE_KEY_CHARACTER_OPERATOR(account?.characterId ?? -1),
		async () => {
			if (!account?.characterId) return null;

			return indexer.getCharacterOperator(account.characterId, operatorAddress);
		},
		{ enabled: !!account?.characterId }
	);
}
