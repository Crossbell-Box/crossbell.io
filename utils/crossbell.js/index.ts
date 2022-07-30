import { Indexer, Contract } from "crossbell.js";
import { useAccount, useProvider } from "wagmi";

const isProductionServer =
	typeof window === "undefined" && process.env.NODE_ENV === "production";

export const indexer = new Indexer(
	isProductionServer ? "http://indexer-v1-api.crossbell/v1" : undefined
);

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
