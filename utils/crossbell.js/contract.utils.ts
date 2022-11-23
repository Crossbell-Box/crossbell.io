import { Contract } from "crossbell.js";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";

import {
	openFaucetHintModel,
	openMintNewCharacterModel,
} from "@/components/common/NewUserGuide";

import { getCsbBalance } from "../apis/indexer";
import { BizError, ERROR_CODES } from "../errors";
import { getCurrentAddress } from "../wallet/provider";

export type InjectContractCheckerConfig = {
	contract: Contract;
	getCurrentCharacterId: () => number | null;
	openConnectModal: () => void;
};

export function injectContractChecker({
	contract,
	openConnectModal,
	getCurrentCharacterId,
}: InjectContractCheckerConfig) {
	return new Proxy(contract, {
		get: (target, prop) => {
			return async (...args: any[]) => {
				const noNeedTxMethods: (string | symbol)[] = ["then"];

				// check if the user is logged in
				const address = getCurrentAddress();
				if (!noNeedTxMethods.includes(prop)) {
					if (!address) {
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

				// check if $CSB is enough to pay for the transaction

				if (!noNeedTxMethods.includes(prop)) {
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
