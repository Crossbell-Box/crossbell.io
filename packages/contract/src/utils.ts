import { Contract } from "crossbell.js";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";

import { getCsbBalance } from "@crossbell/indexer";

import { BizError, ERROR_CODES } from "./errors";

export type InjectContractCheckerConfig = {
	contract: Contract;
	getCurrentCharacterId: () => number | null;
	getCurrentAddress: () => string | null;
	openFaucetHintModel: () => void;
	openMintNewCharacterModel: () => void;
	openConnectModal: () => void;
};

export function injectContractChecker({
	contract,
	getCurrentCharacterId,
	getCurrentAddress,
	openConnectModal,
	openFaucetHintModel,
	openMintNewCharacterModel,
}: InjectContractCheckerConfig) {
	return new Proxy(contract, {
		get: (target, prop) => {
			return async (...args: any[]) => {
				const noNeedTxMethods: (string | symbol)[] = ["then"];

				const address = getCurrentAddress();
				if (!noNeedTxMethods.includes(prop)) {
					if (address) {
						// check if $CSB is enough to pay for the transaction
						const balance = await getCsbBalance(address);
						if (!hasEnoughCsb(balance)) {
							openFaucetHintModel();
							throw new BizError("Not enough $CSB.", ERROR_CODES.NO_CHARACTER);
						}
					} else {
						// check if the user is logged in
						openConnectModal?.();
						throw new BizError(
							"Not connected. Please connect your wallet.",
							ERROR_CODES.NOT_CONNECTED
						);
					}
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

				return (target as any)[prop]?.(...args);
			};
		},
	});
}

function hasEnoughCsb(amount: BigNumber) {
	const threshold = parseEther("0.0001");
	return amount.gte(threshold);
}
