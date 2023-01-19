import {
	useMutation,
	useQueryClient,
	UseMutationResult,
	UseMutationOptions,
} from "@tanstack/react-query";
import { useContract } from "@crossbell/contract";
import { indexer } from "@crossbell/indexer";

import { useAccountState } from "../account-state";
import { useHandleError } from "../use-handle-error";
import { AccountTypeBasedHooksFactory } from "./types";

type Options<Data, Variables> = UseMutationOptions<
	Data | null,
	unknown,
	Variables
>;

export type AccountTypeBasedMutationHooksWithParams<
	Params = void,
	Variables = void,
	Data = unknown
> = (
	params: Params,
	options?: Options<Data, Variables>
) => UseMutationResult<Data, unknown, Variables>;

export type AccountTypeBasedMutationHooksWithoutParams<
	Variables = void,
	Data = unknown
> = (
	options?: Options<Data, Variables>
) => UseMutationResult<Data, unknown, Variables>;

export type AccountTypeBasedMutationHooks<
	Params = void,
	Variables = void,
	Data = unknown
> = Params extends void
	? AccountTypeBasedMutationHooksWithoutParams<Variables, Data>
	: AccountTypeBasedMutationHooksWithParams<Params, Variables, Data>;

export function createAccountTypeBasedMutationHooks<
	Params = void,
	Variables = void,
	Data = unknown
>(
	{
		actionDesc,
		withParams,
	}: { actionDesc: string; withParams: Params extends void ? false : true },
	useFactory: AccountTypeBasedHooksFactory<Params, Variables, Data>
): AccountTypeBasedMutationHooks<Params, Variables, Data> {
	const fnName = `use(${actionDesc})`;

	function useFn(
		params: Params,
		options?: UseMutationOptions<Data | null, unknown, Variables>
	) {
		const factory = useFactory(params);
		const queryClient = useQueryClient();
		const account = useAccountState((s) => s.computed.account);
		const handleError = useHandleError(`Error while ${actionDesc}`);
		const contract = useContract();

		return useMutation(
			async (variable) => {
				switch (account?.type) {
					case "email":
						return factory.email(variable, { contract, indexer, account });
					case "wallet":
						return factory.contract(variable, { contract, indexer, account });
					default:
						return null;
				}
			},

			{
				...options,

				onSuccess(...params) {
					const [data, variables] = params;

					return Promise.all([
						options?.onSuccess?.(...params),
						factory.onSuccess?.({ data, variables, queryClient }),
					]);
				},

				onError(...params) {
					options?.onError?.(...params);
					handleError(params[0]);
				},
			}
		);
	}

	return {
		a: {
			[fnName](
				params: Params,
				options?: UseMutationOptions<Data | null, unknown, Variables>
			) {
				return useFn(params, options);
			},
		},
		b: {
			[fnName](options?: UseMutationOptions<Data | null, unknown, Variables>) {
				return useFn(undefined as Params, options);
			},
		},
	}[withParams ? "a" : "b"][fnName] as AccountTypeBasedMutationHooks<
		Params,
		Variables,
		Data
	>;
}
