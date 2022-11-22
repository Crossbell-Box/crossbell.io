import { useQuery } from "@tanstack/react-query";

import { useContract } from "@/utils/crossbell.js";
import { OPERATOR_ADDRESS } from "@/utils/apis/operator-sync";

import { useAccountStore } from "../account-store";

import { SCOPE_KEY_CHARACTER_OPERATOR } from "./const";

export function useCharacterOperators() {
	const contract = useContract();
	const isEmailAccount = useAccountStore((s) => !!s.email);
	const characterId = useAccountStore((s) => s.computed.account?.characterId);
	const ssrReady = useAccountStore((s) => s.ssrReady);

	return useQuery(
		SCOPE_KEY_CHARACTER_OPERATOR(characterId ?? -1),
		() => {
			if (isEmailAccount) {
				// Email account have OPERATOR by default.
				return [OPERATOR_ADDRESS];
			} else {
				return contract.getOperators(characterId!).then((res) => res.data);
			}
		},
		{ enabled: !!characterId && ssrReady }
	);
}
