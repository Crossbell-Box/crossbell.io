import { BigNumber } from "ethers";
import LRUCache from "lru-cache";

const cache = new LRUCache({ ttl: 1000 * 10, max: 10 }); // 10s cache

export type GetCsbBalanceOptions = {
	noCache?: boolean;
};

/**
 * @returns csb in gwei
 */
export async function getCsbBalance(
	address: string,
	options?: GetCsbBalanceOptions
) {
	const cached = cache.get(`csb:${address}`);

	if (cached && !options?.noCache) {
		return BigNumber.from(cached);
	}

	const data: { result?: string | null } = await fetch(
		`https://scan.crossbell.io/api?module=account&action=balance&address=${address}`
	)
		.then((res) => res.json())
		.catch(() => ({ result: "0" }));

	const result = data.result ?? "0";

	cache.set(`csb:${address}`, result);

	return BigNumber.from(result);
}
