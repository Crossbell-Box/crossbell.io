import { BigNumber, utils } from "ethers";
import React from "react";

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
		const value = BigNumber.from(csb);

		return {
			decimals,
			formatted: utils.formatUnits(value, decimals),
			symbol: "CSB",
			value,
		};
	}, [csb]);
}
