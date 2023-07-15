import { useQuery } from "@tanstack/react-query";

import { faucetGetAddressInfo } from "../../apis";

export const SCOPE_KEY_FAUCET_ADDRESS_INFO = (address?: string) => [
	"faucet",
	"address-info",
	address,
];

export function useFaucetAddressInfo(address?: string) {
	return useQuery(
		SCOPE_KEY_FAUCET_ADDRESS_INFO(address),
		() => faucetGetAddressInfo(address!),
		{ enabled: !!address },
	);
}
