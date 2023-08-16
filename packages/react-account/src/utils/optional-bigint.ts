export type OptionalBigint = bigint | null;

export function optionalBigint(input: any): OptionalBigint {
	try {
		return BigInt(input);
	} catch {
		return null;
	}
}
