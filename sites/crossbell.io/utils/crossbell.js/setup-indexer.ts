import { updateIndexerEndpoint } from "@crossbell/indexer";

import config from "../../config";

if (config.indexer.endpoint) {
	updateIndexerEndpoint(config.indexer.endpoint);
}
