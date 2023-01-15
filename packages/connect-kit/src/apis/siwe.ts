import { Signer } from "ethers";

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
