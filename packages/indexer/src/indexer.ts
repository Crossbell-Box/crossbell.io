import { type Indexer, createIndexer } from "crossbell";

export { type Indexer };

export const indexer = createIndexer();

export function updateIndexerFetchOptions(
	options: Omit<RequestInit, "method">
) {
	indexer.fetchOptions = options;
}

export function updateIndexerEndpoint(endpoint: string) {
	indexer.endpoint = endpoint;
}
