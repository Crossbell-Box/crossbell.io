const RETRY_SYMBOL = Symbol("async-retry:retry");

export type AsyncRetryCallback<T> = (
	RETRY: typeof RETRY_SYMBOL
) => Promise<T | typeof RETRY_SYMBOL>;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function asyncRetry<T>(
	callback: AsyncRetryCallback<T>,
	delayMs: number = 1000
): Promise<T> {
	while (true) {
		const result = await callback(RETRY_SYMBOL);

		if (result !== RETRY_SYMBOL) {
			return result;
		} else {
			await sleep(delayMs);
		}
	}
}
