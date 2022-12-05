import { BigNumber } from "ethers";
import LRUCache from "lru-cache";

const cache = new LRUCache({ ttl: 1000 * 10, max: 10 }); // 10s cache

/**
 * @returns csb in gwei
 */
export async function getCsbBalance(address: string) {
	const cached = cache.get(`csb:${address}`);
	if (cached) {
		return BigNumber.from(cached);
	}

	const data = await fetch(
		`https://scan.crossbell.io/api?module=account&action=balance&address=${address}`
	).then((res) => res.json());

	const result = data.result as string;
	cache.set(`csb:${address}`, result);

	const bn = BigNumber.from(result);

	return bn;
}
