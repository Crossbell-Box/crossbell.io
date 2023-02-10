import { Contract, Indexer } from "crossbell.js";
import { useQueryClient } from "@tanstack/react-query";

import { EmailAccount, GeneralAccount, WalletAccount } from "../account-state";

export type Context<T> = { contract: Contract; indexer: Indexer } & T;

export type AccountTypeBasedHooksFactory<Params, Variables, Data> = (
	params: Params
) => {
	email?: (
		v: Variables,
		context: Context<{ account: EmailAccount }>
	) => Promise<Data>;

	contract?: (
		v: Variables,
		context: Context<{
			account: Omit<WalletAccount, "siwe">;
			siwe: WalletAccount["siwe"];
		}>
	) => Promise<Data>;

	onSuccess?: (params: {
		data: Data | null;
		variables: Variables;
		account: GeneralAccount | null;
		queryClient: ReturnType<typeof useQueryClient>;
	}) => Promise<unknown>;
};
