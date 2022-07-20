import type { BigNumberish } from "ethers";
import { useQuery } from "react-query";
import { indexer } from "@/utils/crossbell.js";

const SCOPE_KEYS = ["indexer", "mintedNotes"];

export function useMintedNote(contractId?: BigNumberish, tokenId?: BigNumberish) {
  return useQuery(
    [...SCOPE_KEYS, "one", contractId, tokenId],
    () => indexer.getMintedNote(contractId!, tokenId!),
    { enabled: Boolean(contractId) && Boolean(tokenId) }
  )
}

export function useMintedNotesOfAddress(address?: string) {
  return useQuery(
    [...SCOPE_KEYS, "list", address],
    () => indexer.getMintedNotesOfAddress(address!),
    { enabled: Boolean(address) }
  )
}

export function useMintedNotesOfNote(characterId?: BigNumberish, noteId?: BigNumberish) {
  return useQuery(
    [...SCOPE_KEYS, "list", characterId, noteId],
    () => indexer.getMintedNotesOfNote(characterId!, noteId!),
    { enabled: Boolean(characterId) && Boolean(noteId) }
  )
}
