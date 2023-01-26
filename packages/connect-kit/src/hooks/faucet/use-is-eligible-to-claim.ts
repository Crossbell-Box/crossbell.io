import { useAccountState } from "../account-state";

import { useFaucetAddressInfo } from "./use-faucet-address-info";

export type UseIsEligibleToClaimResult = {
	isLoading: boolean;
	isEligibleToClaim: boolean;
	isNeedTwitterToClaim: boolean;
};

export function useIsEligibleToClaim(): UseIsEligibleToClaimResult {
	const address = useAccountState((s) => s.wallet?.address);
	const { data: addressInfo, isLoading } = useFaucetAddressInfo(address);

	const isEligibleToClaim = !!(
		address &&
		!isLoading &&
		addressInfo?.balance &&
		addressInfo.eligible
	);

	const isNeedTwitterToClaim =
		isEligibleToClaim && !addressInfo.has_enough_mainnet_txs;

	return {
		isLoading,
		isEligibleToClaim,
		isNeedTwitterToClaim,
	};
}
