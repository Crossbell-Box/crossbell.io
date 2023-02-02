import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import {
	faucetClaim,
	FaucetClaimParams,
	faucetGetTransaction,
} from "../../apis";
import { useHandleError } from "../use-handle-error";
import { asyncRetry } from "../../utils";

export type UseWalletClaimCsbOptions = UseMutationOptions<
	unknown,
	unknown,
	Parameters<typeof faucetClaim>[0]
>;

export function useWalletClaimCsb(options?: UseWalletClaimCsbOptions) {
	const handleError = useHandleError("Wallet Claim CSB");

	return useMutation(
		async (params: FaucetClaimParams) => {
			const claim = await faucetClaim(params);

			if (claim.transaction_hash) {
				await asyncRetry(
					async (RETRY) =>
						(await faucetGetTransaction(claim.transaction_hash)).is_pending &&
						RETRY
				);
			}

			return claim;
		},
		{
			...options,

			onError(...params) {
				options?.onError?.(...params);
				handleError(params[0]);
			},
		}
	);
}
