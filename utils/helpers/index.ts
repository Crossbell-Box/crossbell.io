// some helper functions

/**
 * Converts a string to an integer (as a seeded random number).
 */
export function stringToInteger(
	string: string,
	{
		min = 0,
		max = Number.MAX_SAFE_INTEGER,
	}: {
		min?: number;
		max?: number;
	} = {}
) {
	let total = 0;
	for (var i = 0; i !== string.length; i++) {
		if (total >= Number.MAX_SAFE_INTEGER) break;
		total += string.charCodeAt(i);
	}
	return Math.floor(total % (max - min)) + min;
}
