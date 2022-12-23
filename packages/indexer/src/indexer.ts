import { Indexer } from "crossbell.js";

export { Indexer };

export const indexer = new Indexer();

export function updateIndexerEndpoint(endpoint: string) {
	indexer.endpoint = endpoint;
}
