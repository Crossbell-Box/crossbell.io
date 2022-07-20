import { Indexer, Contract } from "crossbell.js";
import { useAccount, useProvider } from "wagmi";

export const indexer = new Indexer();

let contract: Contract;
export const useContract = () => {
	// const provider = (globalThis as any).ethereum; // TODO: other wallet?
	const { connector } = useAccount();

	if (!contract) {
		connector?.getProvider().then((res) => {
			contract = new Contract(res as any);
			return contract.connect();
		});
	}

	return contract;
};
