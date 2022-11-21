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
	}).then((res) => res.json());
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
			handle: string;
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
	const {
		email,
		characterId,
		message,
		csb,
		handle = "handle",
	} = await request("/newbie/account", { method: "GET", token });

	if (email && characterId) {
		return { ok: true, email, characterId, csb, handle };
	} else {
		return { ok: false, msg: message };
	}
}
