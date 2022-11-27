import {
	CharacterMetadata,
	LinkItemType,
	NoteMetadata,
	LinkItemNote,
} from "crossbell.js";

import { indexer } from "@/utils/crossbell.js";

type RequestConfig = {
	method: string;
	body?: Record<string, unknown>;
	token?: string;
};
const request = (url: `/${string}`, { body, method, token }: RequestConfig) => {
	const headers = new Headers({ "Content-Type": "application/json" });

	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	return fetch(indexer.endpoint + url, {
		method,
		headers,
		body: body && JSON.stringify(body),
	}).then(async (res) => res.json());
};

export async function registerSendCodeToEmail(
	email: string
): Promise<{ ok: boolean; msg: string }> {
	const result = await request("/newbie/account/signup/email", {
		method: "POST",
		body: { email },
	});

	if (result.ok) {
		return { ok: true, msg: "Email Sent" };
	} else {
		return { ok: false, msg: `${result.message}` };
	}
}

export async function registerVerifyEmailCode(body: {
	email: string;
	code: string;
}): Promise<{ ok: boolean; msg: string }> {
	const result = await request("/newbie/account/signup/email/verify", {
		method: "POST",
		body,
	});

	if (result.ok) {
		return { ok: true, msg: "Email Sent" };
	} else {
		return { ok: false, msg: `${result.message}` };
	}
}

export async function registerByEmail(body: {
	email: string;
	emailVerifyCode: string;
	password: string;
	characterName: string;
}): Promise<{ ok: boolean; msg: string; token: string }> {
	const result = await request("/newbie/account/signup", {
		method: "PUT",
		body,
	});

	if (result.token) {
		return { ok: true, msg: "Registered", token: result.token };
	} else {
		return { ok: false, msg: `${result.message}`, token: "" };
	}
}

export async function connectByEmail(body: {
	email: string;
	password: string;
}): Promise<{ ok: boolean; msg: string; token: string }> {
	const result = await request("/newbie/account/signin", {
		method: "POST",
		body,
	});

	if (result.token) {
		return { ok: true, msg: "Connected", token: result.token };
	} else {
		return { ok: false, msg: `${result.message}`, token: "" };
	}
}

export async function resetPasswordSendCodeToEmail(
	email: string
): Promise<{ ok: boolean; msg: string }> {
	const result = await request("/newbie/account/reset-password/email", {
		method: "POST",
		body: { email },
	});

	if (result.ok) {
		return { ok: true, msg: "Email Sent" };
	} else {
		return { ok: false, msg: `${result.message}` };
	}
}

export async function resetPasswordVerifyEmailCode(body: {
	email: string;
	code: string;
}): Promise<{ ok: boolean; msg: string }> {
	const result = await request("/newbie/account/reset-password/email/verify", {
		method: "POST",
		body,
	});

	if (result.ok) {
		return { ok: true, msg: "Email Sent" };
	} else {
		return { ok: false, msg: `${result.message}` };
	}
}

export async function resetPasswordByEmail(body: {
	email: string;
	emailVerifyCode: string;
	password: string;
}): Promise<{ ok: boolean; msg: string }> {
	const result = await request("/newbie/account/reset-password", {
		method: "POST",
		body,
	});

	if (result.ok) {
		return { ok: true, msg: "Password reset successful, please login again." };
	} else {
		return { ok: false, msg: `${result.message}` };
	}
}

export type FetchAccountInfoResult =
	| {
			ok: true;
			email: string;
			characterId: number;
			csb: string;
	  }
	| {
			ok: false;
			msg: string;
	  };

export async function fetchAccountInfo(
	token: string
): Promise<FetchAccountInfoResult> {
	// FIXME: - remove handle placeholder
	const { email, characterId, message, csb } = await request(
		"/newbie/account",
		{ method: "GET", token }
	);

	if (email && characterId) {
		return { ok: true, email, characterId, csb };
	} else {
		return { ok: false, msg: message };
	}
}

export async function updateHandle(
	token: string,
	handle: string
): Promise<{ ok: boolean; msg: string }> {
	return request("/newbie/contract/characters/me/handle", {
		method: "POST",
		token,
		body: { handle },
	});
}

export async function updateMetadata(
	token: string,
	metadata: CharacterMetadata
): Promise<{ transactionHash: string; data: string }> {
	return request("/newbie/contract/characters/me/metadata", {
		method: "POST",
		token,
		body: { metadata },
	});
}

export async function linkNote({
	token,
	toNoteId,
	toCharacterId,
	linkType,
	data,
}: {
	token: string;
	toCharacterId: number;
	toNoteId: number;
	linkType: string;
	data?: string;
}): Promise<{ transactionHash: string; data: string }> {
	return request(
		`/newbie/contract/links/notes/${toCharacterId}/${toNoteId}/${linkType}`,
		{ method: "PUT", token, body: { data } }
	);
}

export async function unlinkNote({
	token,
	toNoteId,
	toCharacterId,
	linkType,
}: {
	token: string;
	toCharacterId: number;
	toNoteId: number;
	linkType: string;
}): Promise<{ transactionHash: string; data: string }> {
	return request(
		`/newbie/contract/links/notes/${toCharacterId}/${toNoteId}/${linkType}`,
		{ method: "DELETE", token }
	);
}

export async function linkCharacter({
	token,
	toCharacterId,
	linkType,
	data,
}: {
	token: string;
	toCharacterId: number;
	linkType: string;
	data?: string;
}): Promise<{ transactionHash: string; data: string }> {
	return request(
		`/newbie/contract/links/characters/${toCharacterId}/${linkType}`,
		{ method: "PUT", token, body: { data } }
	);
}

export async function unlinkCharacter({
	token,
	toCharacterId,
	linkType,
}: {
	token: string;
	toCharacterId: number;
	linkType: string;
}): Promise<{ transactionHash: string; data: string }> {
	return request(
		`/newbie/contract/links/characters/${toCharacterId}/${linkType}`,
		{ method: "DELETE", token }
	);
}

export async function putNote({
	token,
	...body
}: {
	token: string;
	metadata: NoteMetadata;
	linkItemType: LinkItemType;
	linkItem: LinkItemNote;
	locked?: boolean;
}): Promise<{ transactionHash: string; data: string }> {
	return request(`/newbie/contract/notes`, {
		method: "PUT",
		token,
		body,
	});
}

export async function addOperator({
	token,
	...body
}: {
	token: string;
	operator: string;
}): Promise<{ transactionHash: string; data: string }> {
	return request(`/newbie/contract/characters/me/operators`, {
		method: "PUT",
		token,
		body,
	});
}

export async function removeOperator({
	token,
	operator,
}: {
	token: string;
	operator: string;
}): Promise<{ transactionHash: string; data: string }> {
	return request(`/newbie/contract/characters/me/operators/${operator}`, {
		method: "DELETE",
		token,
	});
}

export async function refillBalance({
	token,
}: {
	token: string;
}): Promise<{ balance: string; ok: boolean; message: string }> {
	return request(`/newbie/account/balance/refill`, {
		method: "POST",
		token,
		body: {},
	});
}
