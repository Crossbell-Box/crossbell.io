import { useAccountState } from "../account-state";

import { useFaucetAddressInfo } from "./use-faucet-address-info";

export type UseClaimCSBStatusResult = {
	isLoading: boolean;
	isEligibleToClaim: boolean;
	isNeedTwitterToClaim: boolean;
	errorMsg: string;
};

export function useClaimCSBStatus(): UseClaimCSBStatusResult {
	const address = useAccountState((s) => s.wallet?.address);
	const { data: addressInfo, isLoading } = useFaucetAddressInfo(address);

	const [isEligibleToClaim, errorMsg] = ((): [boolean, string] => {
		if (!address) {
			return [false, "Wallet is not connected"];
		}

		if (isLoading) {
			return [false, "Checking Eligibility"];
		}

		if (addressInfo?.claimed_today) {
			return [false, "You have claimed today"];
		}

		if (Number.parseFloat(addressInfo?.balance ?? "0") >= 0.02) {
			return [false, "You have enough CSB"];
		}

		if (addressInfo?.eligible) {
			return [true, ""];
		} else {
			return [true, "Sorry, you're not eligible to claim"];
		}
	})();

	const isNeedTwitterToClaim =
		isEligibleToClaim && !addressInfo?.has_enough_mainnet_txs;

	return {
		isLoading,
		isEligibleToClaim,
		isNeedTwitterToClaim,
		errorMsg,
	};
}
