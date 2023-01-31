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
import { useOPSignOperatorHasPermissions } from "../operator-sign";

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

export type AccountTypeBasedMutationOptions<
	T extends AccountTypeBasedMutationHooks<any, any, any>
> = T extends AccountTypeBasedMutationHooks<any, infer Variables, infer Data>
	? Options<Data, Variables>
	: never;

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
		const opSignOperatorHasPermissions = useOPSignOperatorHasPermissions({
			characterId: account?.characterId,
		});

		return useMutation(
			async (variable) => {
				switch (account?.type) {
					case "email":
						return (
							factory.email?.(variable, {
								contract,
								indexer,
								account,
							}) ?? null
						);
					case "wallet":
						return (
							factory.contract?.(variable, {
								contract,
								indexer,
								account,
								siwe: opSignOperatorHasPermissions ? account.siwe : undefined,
							}) ?? null
						);
					default:
						return null;
				}
			},

			{
				...options,

				async onSuccess(...params) {
					const [data, variables] = params;

					await factory.onSuccess?.({ data, variables, queryClient });

					return options?.onSuccess?.(...params);
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
