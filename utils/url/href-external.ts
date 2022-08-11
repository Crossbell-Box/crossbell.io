/**
 * @example https://scan.crossbell.io/tx/0x47ce113ab3554d995a9766f22f7dd35a8b4457991b33ab54418222e74cc9e9e7
 */
export function composeScanTxHref(txHash: string) {
	return `https://scan.crossbell.io/tx/${txHash}`;
}
