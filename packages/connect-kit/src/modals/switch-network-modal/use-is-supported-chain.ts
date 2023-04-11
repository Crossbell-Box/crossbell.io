import { useNetwork } from "wagmi";
import React from "react";

export function useIsSupportedChain() {
	const { chain, chains } = useNetwork();

	return React.useMemo(
		() => (chain ? chains.find((c) => c.id === chain?.id) : false),
		[chain, chains]
	);
}
