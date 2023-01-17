import { indexer } from "@crossbell/indexer";

type RequestConfig = {
	method: string;
	body?: Record<string, unknown>;
	token?: string;
};

export function request<T = any>(
	url: `/${string}`,
	{ body, method, token }: RequestConfig
): Promise<T> {
	const headers = new Headers({ "Content-Type": "application/json" });

	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	return fetch(indexer.endpoint + url, {
		method,
		headers,
		body: body && JSON.stringify(body),
	}).then(async (res) => {
		const result = await res.json();

		if (!res.ok) {
			throw new Error(result.message);
		}

		return result;
	});
}
