import { useContract } from "@crossbell/contract";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { BigNumber } from "ethers";

export type UseTransferCSBParams = {
	toAddress: string;
	amount: BigNumber;
};

export type UseTransferCSBOptions = UseMutationOptions<
	unknown,
	unknown,
	UseTransferCSBParams
>;

export function useTransferCsb(options?: UseTransferCSBOptions) {
	const contract = useContract();

	return useMutation(
		({ toAddress, amount }) => contract.transferCsb(toAddress, amount),
		options
	);
}
