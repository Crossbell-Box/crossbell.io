import { baseUrl, SCOPE_KEY } from "./consts"
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Account, OperatorSyncServerResponse } from "@/utils/apis/operator-sync/types";

export function useOperatorListSyncAccounts(characterId?: number, options?: any) {
  return useQuery(
    [...SCOPE_KEY, "list", "accounts", characterId],
    (): Promise<OperatorSyncServerResponse<Account[]>> => {
      return fetch(`${baseUrl}/v1/${characterId}/account`)
        .then(res => res.json())
    },
    {
      enabled: Boolean(characterId),
      ...options,
    }
  )
}

export function useOperatorSyncBindAccount(characterId?: number, platform?: string, username?: string, startTime?: string, options?: any) {
  return useMutation(
    [...SCOPE_KEY, "bind", "account", characterId, platform, username],
    (): Promise<OperatorSyncServerResponse<boolean>> => {
      const reqUri = new URL(`${baseUrl}/v1/${characterId}/account/bind/${platform}/${username}`);
      if (startTime) { // Should be in RFC3339 format
        reqUri.searchParams.append("from", startTime);
      }
      return fetch(reqUri, {
        method: "POST",
      }).then(res => res.json())
    },
    {
      enabled: Boolean(characterId) && Boolean(platform) && Boolean(username),
      ...options,
    }
  )
}

export function useOperatorSyncUnbindAccount(characterId?: number, platform?: string, username?: string, options?: any) {
  return useMutation(
    [...SCOPE_KEY, "unbind", "account", characterId, platform, username],
    (): Promise<OperatorSyncServerResponse<boolean>> => {
      return fetch(`${baseUrl}/v1/${characterId}/account/unbind/${platform}/${username}`, {
        method: "DELETE",
      }).then(res => res.json())
    },
    {
      enabled: Boolean(characterId) && Boolean(platform) && Boolean(username),
      ...options,
    }
  )
}
