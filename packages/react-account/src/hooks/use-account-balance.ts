import React from "react";
import { useContract } from "@crossbell/contract";
import { useQuery } from "@tanstack/react-query";
import { formatUnits } from "viem";

import { useConnectedAccount } from "./use-connected-account";
import { GeneralAccount } from "./account-state";

export type AccountBalance = {
	decimals: number;
	formatted: string;
	symbol: string;
	value: bigint;
};

export type UseAccountBalanceResult = {
	balance: AccountBalance | null;
	isLoading: boolean;
};

const NO_BALANCE: UseAccountBalanceResult = { balance: null, isLoading: false };

export const SCOPE_KEY_ACCOUNT_BALANCE = (account: GeneralAccount | null) => [
	"connect-kit",
	"balance",
	account?.type,
	account?.type === "email" ? account.email : account?.address,
];

export function useAccountBalance(): UseAccountBalanceResult {
	const account = useConnectedAccount();
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
	const email = useConnectedAccount("email");

	return React.useMemo((): UseAccountBalanceResult => {
		if (!email) return { balance: null, isLoading: false };

		const decimals = 18;
		const value = BigInt(email.csb);

		return {
			balance: {
				decimals,
				formatted: formatUnits(value, decimals),
				symbol: "CSB",
				value,
			},
			isLoading: false,
		};
	}, [email]);
}

export function useWalletAccountBalance(): UseAccountBalanceResult {
	const wallet = useConnectedAccount("wallet");
	const contract = useContract();

	const { data, isLoading } = useQuery(
		SCOPE_KEY_ACCOUNT_BALANCE(wallet),
		async () => {
			if (!wallet?.address) return null;

			return (await contract.tips.getBalance(wallet.address)).data;
		}
	);

	const balance = React.useMemo(() => {
		if (!data) return null;

		const decimals = 18;
		const value = BigInt(data);

		return {
			decimals,
			formatted: formatUnits(value, decimals),
			symbol: "CSB",
			value,
		};
	}, [data]);

	return {
		balance,
		isLoading,
	};
}
