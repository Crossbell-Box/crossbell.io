/**
 * @example https://scan.crossbell.io/tx/0x47ce113ab3554d995a9766f22f7dd35a8b4457991b33ab54418222e74cc9e9e7
 */
export function composeScanTxHref(txHash: string) {
	return `https://scan.crossbell.io/tx/${txHash}`;
}

/**
 * @example https://scan.crossbell.io/address/0x2a06a05F456b53E3b0cd3CA3bF68CE76f3CE84AD
 */
export function composeScanAddressHref(addressHash: string) {
	return `https://scan.crossbell.io/address/${addressHash}`;
}
