import { baseUrl, SCOPE_KEY } from "./consts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";

export function useOperatorSyncCheckCharacterActivated(characterId?: number, options?: any) {
  return useQuery(
    [...SCOPE_KEY, "check", "activated", characterId],
    () => {
      return fetch(`${baseUrl}/v1/${characterId}`)
        .then(res => res.json())
        .then(res => res.result?.crossbell_character_id === characterId?.toString())
    },
    {
      enabled: Boolean(characterId),
      ...options,
    }
  )
}

export function useOperatorSyncActivateCharacter(characterId: number, options?: any) {
  const queryClient = useQueryClient();
  return useMutation(
    [...SCOPE_KEY, "do", "activate", characterId],
    () => {
      return fetch(`${baseUrl}/v1/${characterId}`, {
        method: "POST",
      }).then(res => res.json())
        .then(res => res.result?.crossbell_character_id === characterId?.toString())
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([...SCOPE_KEY, "check", "activated", characterId]);
      },
      onError: (err: any) => {
        showNotification({
          title: "Error while activating operator sync",
          message: err.message,
          color: "red",
        });
      },
      ...options,
    }
  )
}
