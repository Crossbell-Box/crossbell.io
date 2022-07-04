import type { BigNumberish } from "ethers";
import { useQuery } from "react-query";
import { indexer } from "@/utils/crossbell.js";
import { useLocalStorage } from "@mantine/hooks";
import { useAccount } from "wagmi";
import { useEffect } from "react";

const SCOPE_KEYS = ["indexer", "characters"];

export function useCharacters(address?: string) {
	return useQuery(
		[...SCOPE_KEYS, "list", address],
		() => indexer.getCharacters(address!),
		{ enabled: Boolean(address) }
	);
}

export function useCharacter(characterId?: BigNumberish) {
	return useQuery(
		[...SCOPE_KEYS, "one", characterId],
		() => indexer.getCharacter(Number(characterId)),
		{ enabled: Boolean(characterId) }
	);
}

export function usePrimaryCharacter<T>(address?: string) {
	return useQuery(
		[...SCOPE_KEYS, "primary", address],
		() => indexer.getPrimaryCharacter(address!),
		{ enabled: Boolean(address) }
	);
}

export function useCurrentCharacterId() {
	return useLocalStorage<number>({
		key: "currentCharacterId",
		serialize: (cid) => cid.toString(),
	});
}

export function useCurrentCharacter() {
	const { data: account } = useAccount();
	const [cid, setCid] = useCurrentCharacterId();

	const query = cid ? useCharacter(cid) : usePrimaryCharacter(account?.address);

	useEffect(() => {
		if (!cid) {
			if (query.data?.characterId) {
				setCid(query.data?.characterId);
			}
		}
	}, [query.data]);

	return query;
}
