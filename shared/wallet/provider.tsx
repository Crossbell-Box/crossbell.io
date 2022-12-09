import { createClient, createStorage, Client } from "wagmi";

import { chains, provider, connectors } from "./config";

const noopStorage: Storage = {
	getItem: (_) => "",
	setItem: (_, __) => null,
	removeItem: (_) => null,
	length: 0,
	key: (_) => null,
	clear: () => null,
};
const storage = createStorage({
	storage: typeof window !== "undefined" ? window.localStorage : noopStorage,
}); // https://wagmi.sh/docs/client#storage-optional

const wagmiClient: Client = createClient({
	autoConnect: true,
	connectors,
	provider,
	storage,
}) as Client;

export function getCurrentAddress() {
	let data = storage.getItem("store") as any;

	if (typeof data === "string") {
		try {
			data = JSON.parse(data);
		} catch {
			return undefined;
		}
	}

	return data?.state?.data?.account;
}

export { chains, wagmiClient };
