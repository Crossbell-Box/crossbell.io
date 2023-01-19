import { Contract, Indexer } from "crossbell.js";
import { useQueryClient } from "@tanstack/react-query";
import { EmailAccount, WalletAccount } from "@crossbell/connect-kit";

export type Context<T> = { contract: Contract; indexer: Indexer } & T;

export type AccountTypeBasedHooksFactory<Params, Variables, Data> = (
	params: Params
) => {
	email: (
		v: Variables,
		context: Context<{ account: EmailAccount }>
	) => Promise<Data>;

	contract: (
		v: Variables,
		context: Context<{ account: WalletAccount }>
	) => Promise<Data>;

	onSuccess?: (params: {
		data: Data | null;
		variables: Variables;
		queryClient: ReturnType<typeof useQueryClient>;
	}) => Promise<unknown>;
};
