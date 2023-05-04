import { waitUntilTransactionFinished } from "../apis";

import { useAccountState } from "./account-state";
import { createAccountTypeBasedMutationHooks } from "./account-type-based-hooks";
import { SCOPE_KEY_ACCOUNT_BALANCE } from "./use-account-balance";
import { type Address } from "viem";

export type UseTransferCSBParams = {
	toAddress: Address;
	amount: bigint;
};

export const useTransferCsb = createAccountTypeBasedMutationHooks<
	void,
	UseTransferCSBParams
>({ actionDesc: "transfer CSB", withParams: false }, () => ({
	wallet: {
		supportOPSign: false,

		async action({ toAddress, amount }, { contract }) {
			const result = await contract.csb.transfer(toAddress, amount);

			await waitUntilTransactionFinished(result.transactionHash);

			return result;
		},
	},

	onSuccess({ queryClient, account }) {
		return Promise.all([
			useAccountState.getState().refresh(),
			queryClient.invalidateQueries(SCOPE_KEY_ACCOUNT_BALANCE(account)),
		]);
	},
}));
