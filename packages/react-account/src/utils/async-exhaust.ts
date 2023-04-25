// re-run the function only if the previous promise has fulfilled
export function asyncExhaust<P extends any[], T>(
	func: (...params: P) => Promise<T>
): (...params: P) => Promise<T> {
	let currentAsync: Promise<T> | null = null;

	const reset = () => {
		currentAsync = null;
	};

	return (...params) => {
		if (!currentAsync) {
			currentAsync = func(...params).finally(reset);
		}

		return currentAsync;
	};
}
