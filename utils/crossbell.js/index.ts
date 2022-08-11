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
		if (connector) {
			// connect the contract with the provider
			connector.getProvider().then(async (res) => {
				contract = new Contract(res as any);
				await contract.connect();
				return contract;
			});
		} else {
			// user is not logged in
			contract = contract ?? new Contract();
			contract =
				contract ??
				new Proxy(contract, {
					get: (target, prop) => {
						return async () => {
							throw new Error("Not connected. Please connect your wallet.");
						};
					},
				});
		}
	}

	return contract;
};
