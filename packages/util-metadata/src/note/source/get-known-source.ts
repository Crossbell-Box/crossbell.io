import { KnownSource } from "./types";

const sourceMap = Object.values(KnownSource).reduce(
	(map, source) => map.set(source.toLowerCase(), source),
	new Map<string, KnownSource>(),
);

export function getKnownSource(source: string): KnownSource | null {
	return sourceMap.get(source.toLowerCase()) ?? null;
}
