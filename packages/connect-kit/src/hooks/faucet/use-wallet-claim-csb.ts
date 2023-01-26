import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { faucetClaim } from "../../apis";
import { useHandleError } from "../use-handle-error";

export type UseWalletClaimCsbOptions = UseMutationOptions<
	unknown,
	unknown,
	Parameters<typeof faucetClaim>[0]
>;

export function useWalletClaimCsb(options?: UseWalletClaimCsbOptions) {
	const handleError = useHandleError("Wallet Claim CSB");

	return useMutation(faucetClaim, {
		...options,

		onError(...params) {
			options?.onError?.(...params);
			handleError(params[0]);
		},
	});
}
