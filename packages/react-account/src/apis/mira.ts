import { indexer } from "@crossbell/indexer";
import { Contract } from "crossbell";
import { type Address, formatUnits } from "viem";

export async function getMiraTokenDecimals(
	contract: Contract
): Promise<number> {
	try {
		return (await contract.tips.getTokenDecimals()).data;
	} catch (error) {
		console.error(error);
		return 18;
	}
}

export async function getMiraTokenAddress(
	contract: Contract
): Promise<Address> {
	try {
		return (await contract.tips.getTokenAddress())?.data;
	} catch (error) {
		return "0xAfB95CC0BD320648B3E8Df6223d9CDD05EbeDC64";
	}
}

export type GetMiraTipsParams = Omit<
	Exclude<Parameters<(typeof indexer)["tip"]["getMany"]>[0], undefined>,
	"tokenAddress"
>;

export async function getMiraTips(
	contract: Contract,
	params: GetMiraTipsParams
) {
	const tokenAddress = await getMiraTokenAddress(contract);

	const tips = await indexer.tip.getMany({ tokenAddress, ...params });

	if (tips?.list?.length) {
		const decimal = await getMiraTokenDecimals(contract);

		tips.list = tips.list
			.filter(
				(t) => BigInt(t.amount) >= BigInt(1) * BigInt(10) ** BigInt(decimal)
			)
			.map((t) => {
				return {
					...t,
					amountDisplay: (
						BigInt(t.amount) /
						BigInt(10) ** BigInt(decimal)
					).toString(),
				};
			});
	}

	return tips;
}

export async function getMiraBalance({
	address,
	contract,
}: {
	address: Address;
	contract: Contract;
}) {
	const { data: value } = await contract.tips.getBalance(address);
	const decimals = await getMiraTokenDecimals(contract);

	return {
		decimals,
		formatted: formatUnits(value, decimals),
		symbol: "MIRA",
		value,
	};
}
