import { Indexer, Contract } from "crossbell.js";
import { useProvider } from "wagmi";

export const indexer = new Indexer();

let contract: Contract | undefined;
export const useContract = () => {
	const provider = (globalThis as any).ethereum; // TODO: other wallet?

	if (!contract) {
		contract = new Contract(provider);
		contract.connect();
	}

	return contract;
};
