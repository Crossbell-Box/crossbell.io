import { Signer } from "ethers";
import {
	CharacterMetadata,
	LinkItemNote,
	LinkItemType,
	NoteMetadata,
} from "crossbell.js";

import { request } from "./utils";

export async function siweSignIn(signer: Signer) {
	const address = await signer.getAddress();

	const { message } = await request<{ message: string }>("/siwe/challenge", {
		method: "POST",
		body: {
			address,
			domain: "crossbell.io",
			uri: "https://crossbell.io",
			statement: "Sign in with Crossbell to the app.",
		},
	});

	const { token } = await request<{ token: string }>("/siwe/login", {
		method: "POST",
		body: {
			address,
			signature: await signer.signMessage(message),
		},
	});

	return { token };
}

export function siweGetAccount(token: string): Promise<{ address: string }> {
	return request(`/siwe/account`, { method: "GET", token });
}

export function siweGetBalance(token: string): Promise<{ balance: string }> {
	return request(`/siwe/account/balance`, { method: "GET", token });
}

export async function siweUpdateMetadata({
	token,
	mode = "merge",
	characterId,
	metadata,
}: {
	token: string;
	characterId: number;
	mode?: "merge" | "replace";
	metadata: CharacterMetadata;
}): Promise<{ transactionHash: string; data: string }> {
	return request(`/siwe/contract/characters/${characterId}/metadata`, {
		method: "POST",
		token,
		body: { metadata, mode },
	});
}

export async function siweLinkNote({
	token,
	characterId,
	toNoteId,
	toCharacterId,
	linkType,
	data,
}: {
	token: string;
	characterId: number;
	toCharacterId: number;
	toNoteId: number;
	linkType: string;
	data?: string;
}): Promise<{ transactionHash: string; data: string }> {
	return request(
		`/siwe/contract/characters/${characterId}/links/notes/${toCharacterId}/${toNoteId}/${linkType}`,
		{ method: "PUT", token, body: { data } }
	);
}

export async function siweUnlinkNote({
	token,
	characterId,
	toNoteId,
	toCharacterId,
	linkType,
}: {
	token: string;
	characterId: number;
	toCharacterId: number;
	toNoteId: number;
	linkType: string;
}): Promise<{ transactionHash: string; data: string }> {
	return request(
		`/siwe/contract/characters/${characterId}/links/notes/${toCharacterId}/${toNoteId}/${linkType}`,
		{ method: "DELETE", token }
	);
}

export async function siweLinkCharacter({
	token,
	characterId,
	toCharacterId,
	linkType,
	data,
}: {
	token: string;
	characterId: number;
	toCharacterId: number;
	linkType: string;
	data?: string;
}): Promise<{ transactionHash: string; data: string }> {
	return request(
		`/siwe/contract/characters/${characterId}/links/characters/${toCharacterId}/${linkType}`,
		{ method: "PUT", token, body: { data } }
	);
}

export async function siweLinkCharacters({
	token,
	characterId,
	toCharacterIds,
	toAddresses,
	linkType,
	data,
}: {
	token: string;
	characterId: number;
	toCharacterIds: number[];
	toAddresses: string[];
	linkType: string;
	data?: string;
}): Promise<{ transactionHash: string; data: string }> {
	return request(`/siwe/contract/characters/${characterId}/links/characters`, {
		method: "PUT",
		token,
		body: { data, linkType, toCharacterIds, toAddresses },
	});
}

export async function siweUnlinkCharacter({
	token,
	characterId,
	toCharacterId,
	linkType,
}: {
	token: string;
	characterId: number;
	toCharacterId: number;
	linkType: string;
}): Promise<{ transactionHash: string; data: string }> {
	return request(
		`/siwe/contract/characters/${characterId}/links/characters/${toCharacterId}/${linkType}`,
		{ method: "DELETE", token }
	);
}

export async function siwePutNote({
	token,
	characterId,
	...body
}: {
	token: string;
	characterId: number;
	metadata: NoteMetadata;
	linkItemType: LinkItemType;
	linkItem: LinkItemNote;
	locked?: boolean;
}): Promise<{ transactionHash: string; data: string }> {
	return request(`/v1/siwe/contract/characters/${characterId}/notes`, {
		method: "PUT",
		token,
		body,
	});
}
