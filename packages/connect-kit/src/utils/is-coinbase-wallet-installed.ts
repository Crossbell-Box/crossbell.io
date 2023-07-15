export function isCoinbaseWalletInstalled(): boolean {
	if (typeof window === "undefined") return false;

	const { ethereum } = window;

	return !!(
		ethereum?.isCoinbaseWallet ||
		(ethereum?.providers &&
			ethereum?.providers.find(
				(provider?: { isCoinbaseWallet?: boolean }) =>
					provider?.isCoinbaseWallet,
			))
	);
}

export function isCoinbaseBrowser(): boolean {
	if (typeof window === "undefined") return false;

	const { ethereum } = window;

	return !!ethereum?.isCoinbaseBrowser;
}
