import config from "config";
import { Indexer, Contract } from "crossbell.js";
import { useAccount } from "wagmi";

const isProductionServer =
	typeof window === "undefined" && process.env.NODE_ENV === "production";

export const indexer = new Indexer(
	isProductionServer ? config.indexer.endpoint : undefined
);

let contract: Contract;
export const useContract = () => {
	const { connector } = useAccount();

	if (!contract) {
		connector?.getProvider().then((res) => {
			contract = new Contract(res as any);
			return contract.connect();
		});
	}

	return contract;
};
