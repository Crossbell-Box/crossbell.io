import type { BigNumberish } from "ethers";
import { useQuery } from "react-query";
import { indexer } from "@/utils/crossbell.js";
import { useLocalStorage } from "@mantine/hooks";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import unidata from "@/utils/unidata";
import type { Profile } from 'unidata.js';

const SCOPE_KEYS = ["indexer", "characters"];

export const postProfile = (item: Profile | undefined) => {
	if (!item) {
		return item;
	}
	if (!item.avatars || !item.avatars.length) {
		item.avatars = [`https://cdn.stamp.fyi/avatar/${item.metadata!.owner!}?s=64`]
	}
	return item;
}

export const postProfiles = (item: Profile[]) => {
	return (<Profile[]>item).map((i) => <Profile>postProfile(i));
}

export function useCharacters(address?: string) {
	return useQuery(
		[...SCOPE_KEYS, "list", address],
		async () => {
			const result = await unidata.profiles.get({
				source: 'Crossbell Profile',
				identity: address!,
			});
			result.list = postProfiles(result.list);
			return result;
		},
		{ enabled: Boolean(address) }
	);
}

export function useCharacter(characterId?: string) {
	return useQuery(
		[...SCOPE_KEYS, "one", characterId],
		async () => {
			const result = await unidata.profiles.get({
				source: 'Crossbell Profile',
				identity: characterId!,
				platform: 'Crossbell',
			});
			return postProfile(result.list[0]);
		},
		{ enabled: Boolean(characterId) }
	);
}

export function usePrimaryCharacter<T>(address?: string) {
	return useQuery(
		[...SCOPE_KEYS, "primary", address],
		async () => {
			const result = await unidata.profiles.get({
				source: 'Crossbell Profile',
				identity: address!,
			});
			return postProfile(result.list?.find((item) => item.metadata?.primary));
		},
		{ enabled: Boolean(address) }
	);
}

export function useCurrentCharacterId() {
	return useLocalStorage<string>({
		key: "currentCharacterId",
	});
}

export function useCurrentCharacter() {
	const { data: account } = useAccount();
	const [cid, setCid] = useCurrentCharacterId();

	const query = cid ? useCharacter(cid) : usePrimaryCharacter(account?.address);

	useEffect(() => {
		if (!cid) {
			if (query.data?.username) {
				setCid(query.data?.username);
			}
		}
	}, [query.data]);

	return query;
}
