import { useBalance } from "wagmi";
import { BigNumber, utils } from "ethers";
import React from "react";

import { useAccountState } from "./account-state";

export type UseAccountBalanceResult = {
	balance: ReturnType<typeof useBalance>["data"] | null;
	isLoading: boolean;
};

const NO_BALANCE: UseAccountBalanceResult = { balance: null, isLoading: false };

export function useAccountBalance(): UseAccountBalanceResult {
	const account = useAccountState((s) => s.computed.account);
	const emailBalance = useEmailAccountBalance();
	const walletBalance = useWalletAccountBalance();

	switch (account?.type) {
		case "email":
			return emailBalance;
		case "wallet":
			return walletBalance;
		default:
			return NO_BALANCE;
	}
}

export function useEmailAccountBalance(): UseAccountBalanceResult {
	const email = useAccountState((s) => s.email);

	return React.useMemo((): UseAccountBalanceResult => {
		if (!email) return { balance: null, isLoading: false };

		const decimals = 18;
		const value = BigNumber.from(email.csb);

		return {
			balance: {
				decimals,
				formatted: utils.formatUnits(value, decimals),
				symbol: "CSB",
				value,
			},
			isLoading: false,
		};
	}, [email]);
}

export function useWalletAccountBalance(): UseAccountBalanceResult {
	const wallet = useAccountState((s) => s.wallet);

	const { data: balance, isLoading } = useBalance({
		address: wallet?.address as `0x${string}` | undefined,
	});

	return React.useMemo(() => ({ balance, isLoading }), [balance, isLoading]);
}
