import { createIndexer, Indexer } from "crossbell";

export { Indexer };

export const indexer = createIndexer();

export function updateIndexerEndpoint(endpoint: string) {
	indexer.endpoint = endpoint;
}
