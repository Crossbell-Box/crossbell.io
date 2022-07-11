import type { BigNumberish } from "ethers";
import { useQuery } from "react-query";
import { indexer } from "@/utils/crossbell.js";
import { useLocalStorage } from "@mantine/hooks";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import unidata from "@/utils/unidata";
import type { Profile } from 'unidata.js';

export const SCOPE_KEYS = ["indexer", "characters"];

export const handleCharacter = (item: Profile | undefined) => {
  if (!item) {
    return item;
  }
  if (!item.avatars || !item.avatars.length) {
    item.avatars = [`https://cdn.stamp.fyi/avatar/${item.metadata!.owner!}?s=64`]
  }
  return item;
}

export const handleCharacters = (item: Profile[]) => {
  return (<Profile[]>item).map((i) => <Profile>handleCharacter(i));
}

export function useCharacters(address?: string, withLinks?: boolean) {
  return useQuery(
    [...SCOPE_KEYS, "list", address, withLinks],
    async () => {
      if (!address) {
        return null;
      } else {
        const result = await unidata.profiles.get({
          source: 'Crossbell Profile',
          identity: address!,
        });
        result.list = handleCharacters(result.list);
        if (withLinks) {
          await Promise.all(result.list.map(async (c) => {
            c.metadata!.followings = (await unidata.links.get({
              source: 'Crossbell Link',
              identity: c.username!,
              platform: 'Crossbell',
              limit: 0,
            }))?.total;
            c.metadata!.followers = (await unidata.links.get({
              source: 'Crossbell Link',
              identity: c.username!,
              platform: 'Crossbell',
              reversed: true,
              limit: 0,
            }))?.total;
            return c;
          }));
        }
        return result;
      }
    },
    { enabled: Boolean(address) }
  );
}

export function useCharacter(characterId?: string) {
  return useQuery(
    [...SCOPE_KEYS, "one", characterId],
    async () => {
      if (!characterId) {
        return null;
      } else {
        const result = await unidata.profiles.get({
          source: 'Crossbell Profile',
          identity: characterId,
          platform: 'Crossbell',
        });
        return handleCharacter(result.list[0]);
      }
    },
    { enabled: Boolean(characterId) }
  );
}

export function usePrimaryCharacter<T>(address?: string) {
  return useQuery(
    [...SCOPE_KEYS, "primary", address],
    async () => {
      if (!address) {
        return null;
      } else {
        const result = await unidata.profiles.get({
          source: 'Crossbell Profile',
          identity: address!,
        });
        return handleCharacter(result.list?.find((item) => item.metadata?.primary));
      }
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

export function useLinks(input: {
  characterId: string;
  reversed?: boolean;
  limit?: number;
}) {
  return useQuery(
    [...SCOPE_KEYS, "links", input],
    async () => {
      const result = await unidata.links.get({
        source: 'Crossbell Link',
        identity: input.characterId,
        reversed: input.reversed,
        limit: input.limit,
      });
      return result;
    },
    { enabled: Boolean(input.characterId) }
  );
}