import { useBalance } from "wagmi";
import { BigNumber, utils } from "ethers";
import React from "react";

import { useAccountState } from "../account-state";

export function useOpSignBalance():
	| ReturnType<typeof useBalance>["data"]
	| null {
	const csb = useAccountState((s) => s.wallet?.siwe?.csb);

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
