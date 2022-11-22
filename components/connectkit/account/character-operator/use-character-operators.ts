import { useQuery } from "@tanstack/react-query";

import { useContract } from "@/utils/crossbell.js";

import { useAccountStore } from "../account-store";

import { SCOPE_KEY_CHARACTER_OPERATOR } from "./const";

export function useCharacterOperators() {
	const contract = useContract();
	const characterId = useAccountStore((s) => s.computed.account?.characterId);
	const ssrReady = useAccountStore((s) => s.ssrReady);

	return useQuery(
		SCOPE_KEY_CHARACTER_OPERATOR(characterId ?? -1),
		() =>
			contract.getOperators(characterId!).then((res) => res.data as string[]),
		{ enabled: !!characterId && ssrReady }
	);
}
