import { BigNumber } from "ethers";

import { waitUntilTransactionFinished } from "../apis";

import { useAccountState } from "./account-state";
import { createAccountTypeBasedMutationHooks } from "./account-type-based-hooks";

export type UseTransferCSBParams = {
	toAddress: string;
	amount: BigNumber;
};

export const useTransferCsb = createAccountTypeBasedMutationHooks<
	void,
	UseTransferCSBParams
>({ actionDesc: "transfer CSB", withParams: false }, () => ({
	wallet: {
		supportOPSign: false,

		async action({ toAddress, amount }, { contract }) {
			const result = await contract.transferCsb(toAddress, amount);

			await waitUntilTransactionFinished(result.transactionHash);

			return result;
		},
	},

	onSuccess() {
		return Promise.all([useAccountState.getState().refresh()]);
	},
}));
