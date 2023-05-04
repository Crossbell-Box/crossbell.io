import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { getCsbBalance } from "@crossbell/indexer";

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
					async (RETRY) => {
						const [transaction, balance] = await Promise.all([
							faucetGetTransaction(claim.transaction_hash),
							getCsbBalance(params.address, { noCache: true }),
						]);

						if (transaction.is_pending || balance === 0n) return RETRY;

						return true;
					},
					{ maxRetryTimes: Number.MAX_SAFE_INTEGER }
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
