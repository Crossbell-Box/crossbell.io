import {
	openFaucetHintModel,
	openMintNewCharacterModel,
} from "@/components/common/NewUserGuide";
import config from "config";
import { Indexer, Contract } from "crossbell.js";
import { useAccount } from "wagmi";
import { getCsbBalance, getCurrentCharacterId } from "../apis/indexer";
import { getAccount } from "@wagmi/core";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { BizError, ERROR_CODES } from "../errors";

const isProductionServer =
	typeof window === "undefined" && process.env.NODE_ENV === "production";

export const indexer = new Indexer(
	isProductionServer ? config.indexer.endpoint : undefined
);

let contract: Contract;
export const useContract = () => {
	const { connector, isConnected } = useAccount();

	if (isConnected && connector) {
		// connect the contract with the provider
		connector.getProvider().then(async (res) => {
			contract = new Contract(res as any);
			await contract.connect();
			contract = injectContractChecker(contract);
			return contract;
		});
	} else {
		// user is not logged in
		contract = new Contract();
		contract.connect();
		contract = injectContractChecker(contract);
	}

	return contract;
};

function injectContractChecker(contract: Contract) {
	return new Proxy(contract, {
		get: (target, prop) => {
			return async (...args: any[]) => {
				const { address, isConnected } = getAccount();
				// check if the user is logged in
				if (!isConnected || !address) {
					throw new BizError(
						"Not connected. Please connect your wallet.",
						ERROR_CODES.NOT_CONNECTED
					);
				}

				// check if the wallet has any character
				const allowedMethods: (string | symbol)[] = [
					"then",
					"createCharacter",
					"getBalance",
				];
				if (!allowedMethods.includes(prop)) {
					const ccid = getCurrentCharacterId();
					if (!ccid) {
						openMintNewCharacterModel();
						throw new BizError(
							"You don't have a character yet",
							ERROR_CODES.NO_CHARACTER
						);
					}
				}

				// check if $CSB is enough to pay for the transaction
				const noNeedCsbMethods: (string | symbol)[] = ["then"];
				if (!noNeedCsbMethods.includes(prop)) {
					const balance = await getCsbBalance(address);
					if (!hasEnoughCsb(balance)) {
						openFaucetHintModel();
						throw new BizError("Not enough $CSB.", ERROR_CODES.NO_CHARACTER);
					}
				}

				return (target as any)[prop]?.(...args);
			};
		},
	});
}

function hasEnoughCsb(amount: BigNumber) {
	const threshold = parseEther("0.0001");
	return amount.gte(threshold);
}
