import { updateIndexerEndpoint } from "@crossbell/indexer";

import config from "~/shared/config";

if (config.indexer.endpoint) {
	updateIndexerEndpoint(config.indexer.endpoint);
}
