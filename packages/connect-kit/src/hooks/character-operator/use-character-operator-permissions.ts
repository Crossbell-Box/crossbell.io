import { useQuery } from "@tanstack/react-query";
import { useContract } from "@crossbell/contract";

import { useAccountState } from "../account-state";

import { SCOPE_KEY_CHARACTER_OPERATOR } from "./const";

export function useCharacterOperatorPermissions(operatorAddress: string) {
	const account = useAccountState((s) => s.computed.account);
	const contract = useContract();

	return useQuery(
		SCOPE_KEY_CHARACTER_OPERATOR(account?.characterId ?? -1),
		async () => {
			if (!account?.characterId) return null;

			return contract
				.getOperatorPermissionsForCharacter(
					account.characterId,
					operatorAddress
				)
				.then(({ data }) => data);
		},
		{ enabled: !!account?.characterId }
	);
}
