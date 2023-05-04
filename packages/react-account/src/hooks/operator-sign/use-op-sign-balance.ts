import React from "react";
import { formatUnits } from "viem";
import { useAccountState } from "../account-state";
import { AccountBalance } from "../use-account-balance";

export function useOpSignBalance(): AccountBalance | null {
	const [csb, refreshWallet] = useAccountState((s) => [
		s.wallet?.siwe?.csb,
		s.refreshWallet,
	]);

	React.useEffect(() => {
		refreshWallet();
	}, [refreshWallet]);

	return React.useMemo(() => {
		if (!csb) return null;

		const decimals = 18;
		const value = BigInt(csb);

		return {
			decimals,
			formatted: formatUnits(value, decimals),
			symbol: "CSB",
			value,
		};
	}, [csb]);
}
