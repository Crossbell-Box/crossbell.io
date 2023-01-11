import { useBalance } from "wagmi";
import { BigNumber, utils } from "ethers";
import React from "react";

import { useAccountState } from "./account-state";

export type UseAccountBalanceResult = {
	balance: ReturnType<typeof useBalance>["data"] | null;
	isLoading: boolean;
};

export function useAccountBalance(): UseAccountBalanceResult {
	const account = useAccountState((s) => s.computed.account);

	const { data: balance, isLoading } = useBalance({
		addressOrName: account?.address,
	});

	return React.useMemo((): UseAccountBalanceResult => {
		switch (account?.type) {
			case "email": {
				const decimals = 18;
				const value = BigNumber.from(account.csb);

				return {
					balance: {
						decimals,
						formatted: utils.formatUnits(value, decimals),
						symbol: "CSB",
						value,
					},
					isLoading: false,
				};
			}
			case "wallet":
				return { balance, isLoading };
		}

		return { balance: null, isLoading: true };
	}, [account, balance, isLoading]);
}
