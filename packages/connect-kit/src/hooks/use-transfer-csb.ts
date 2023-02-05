import { BigNumber } from "ethers";

import { createAccountTypeBasedMutationHooks } from "./account-type-based-hooks";
import { useAccountState } from "@crossbell/connect-kit";

export type UseTransferCSBParams = {
	toAddress: string;
	amount: BigNumber;
};

export const useTransferCsb = createAccountTypeBasedMutationHooks<
	void,
	UseTransferCSBParams
>({ actionDesc: "transfer CSB", withParams: false }, () => ({
	contract({ toAddress, amount }, { contract }) {
		return contract.transferCsb(toAddress, amount);
	},

	onSuccess() {
		return Promise.all([useAccountState.getState().refresh()]);
	},
}));
