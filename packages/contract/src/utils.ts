import { Contract, Numberish } from "crossbell";
import { isCrossbellMainnet } from "crossbell/network";
import { parseEther } from "viem";
import { getCsbBalance } from "@crossbell/indexer";
import { type Address } from "viem";

import { BizError, ERROR_CODES } from "./errors";

export type InjectContractCheckerConfig = {
	contract: Contract;
	getCurrentCharacterId: () => number | null;
	getCurrentAddress: () => Address | null;
	openFaucetHintModel: () => void;
	openMintNewCharacterModel: () => void;
	openConnectModal: () => void;
	showSwitchNetworkModal?: (contract: Contract) => Promise<void>;
};

export function injectContractChecker({
	contract,
	getCurrentCharacterId,
	getCurrentAddress,
	openConnectModal,
	openFaucetHintModel,
	openMintNewCharacterModel,
	showSwitchNetworkModal,
}: InjectContractCheckerConfig) {
	return handleActions(contract, async ({ action, path }) => {
		if (needValidate(path)) {
			await checkNetwork(contract, showSwitchNetworkModal);

			const address = getCurrentAddress();

			if (address) {
				// check if $CSB is enough to pay for the transaction
				const balance = await getCsbBalance(address);
				if (!hasEnoughCsb(balance)) {
					openFaucetHintModel();
					throw new BizError("Not enough $CSB.", ERROR_CODES.NO_CHARACTER);
				}
			} else {
				// user is not logged in
				openConnectModal?.();
				throw new BizError(
					"Not connected. Please connect your wallet.",
					ERROR_CODES.NOT_CONNECTED
				);
			}

			// check if the wallet has any character
			if (needCheckCharacter(path) && !getCurrentCharacterId()) {
				openMintNewCharacterModel();
				throw new BizError(
					"You don't have a character yet",
					ERROR_CODES.NO_CHARACTER
				);
			}
		}

		return action();
	});
}

function needCheckCharacter(path: (string | symbol)[]) {
	const key = lastOne(path);

	const whitelist: (string | symbol)[] = ["createCharacter"];

	return key ? !whitelist.includes(key) : false;
}

function needValidate(path: (string | symbol)[]) {
	const key = lastOne(path);

	if (typeof key === "string") {
		return !(key === "then" || key.startsWith("get"));
	}

	return true;
}

function hasEnoughCsb(amount: Numberish) {
	const threshold = parseEther("0.0001");
	return BigInt(amount) >= threshold;
}

async function checkNetwork(
	contract: Contract<true>,
	showModal: InjectContractCheckerConfig["showSwitchNetworkModal"]
) {
	const isMainnet = await isCrossbellMainnet(contract.walletClient);

	if (!isMainnet) {
		await showModal?.(contract);
	}
}

type ActionHandler = <T>(params: {
	action: () => T;
	path: string[];
}) => Promise<T>;

type RawAction = (...args: any[]) => any;

function handleActions<T extends object>(obj: T, callback: ActionHandler): T {
	function createProxy<T extends object>(target: T, path: string[]): T {
		return new Proxy<T>(target, {
			get: (target, prop) => {
				const newPath = path.concat([String(prop)]);
				const key = prop as keyof typeof target;
				const value = target[key];

				if (typeof value === "function") {
					return function (...args: any[]) {
						return callback({
							action: () => (target[key] as RawAction)(...args),
							path: newPath,
						});
					};
				} else if (typeof value === "object" && value !== null) {
					return createProxy(value, newPath);
				} else {
					return value;
				}
			},
		});
	}

	return createProxy<T>(obj, []);
}

function lastOne<T>(list: T[]): T | undefined {
	return list[list.length - 1];
}
