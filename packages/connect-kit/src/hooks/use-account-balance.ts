import { useBalance } from "wagmi";
import { BigNumber } from "ethers";

import { formatUnits } from "ethers/lib/utils";

import { useAccountState } from "./account-state";

export type UseAccountBalanceResult = {
	balance: string | null;
	isLoading: boolean;
};

export function useAccountBalance(): UseAccountBalanceResult {
	const account = useAccountState((s) => s.computed.account);

	const { data: balance, isLoading } = useBalance({
		addressOrName: account?.address,
	});

	switch (account?.type) {
		case "email":
			return {
				balance: formatUnits(BigNumber.from(account.csb), 18),
				isLoading: false,
			};
		case "wallet":
			return { balance: balance?.formatted ?? null, isLoading };
	}

	return { balance: null, isLoading: true };
}