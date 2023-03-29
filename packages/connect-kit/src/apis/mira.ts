import { indexer } from "@crossbell/indexer";
import { Contract } from "crossbell.js";

export async function getMiraTokenDecimal(contract: Contract): Promise<number> {
	try {
		return (await contract.getMiraTokenDecimals()).data;
	} catch (error) {
		console.error(error);
		return 18;
	}
}

export async function getMiraTokenAddress(contract: Contract): Promise<string> {
	try {
		return (await contract.getMiraTokenAddress())?.data;
	} catch (error) {
		return "0xAfB95CC0BD320648B3E8Df6223d9CDD05EbeDC64";
	}
}

export type GetMiraTipsParams = Omit<
	Exclude<Parameters<typeof indexer.getTips>[0], undefined>,
	"tokenAddress"
>;

export async function getMiraTips(
	contract: Contract,
	params: GetMiraTipsParams
) {
	const tokenAddress = await getMiraTokenAddress(contract);

	const tips = await indexer.getTips({ tokenAddress, ...params });

	if (tips?.list?.length) {
		const decimal = await getMiraTokenDecimal(contract);

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
