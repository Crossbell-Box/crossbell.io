import { Indexer, Contract } from "crossbell.js";
import { useAccount, useProvider } from "wagmi";

const isProductionServer =
	typeof window === "undefined" && process.env.NODE_ENV === "production";

export const indexer = new Indexer(
	isProductionServer ? "https://indexer.crossbell.io" : undefined
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
