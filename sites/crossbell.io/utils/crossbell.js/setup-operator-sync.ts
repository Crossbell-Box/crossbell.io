import { operatorSyncApi } from "@crossbell/connect-kit";

import config from "~/config";

if (config.operatorSync.endpoint) {
	operatorSyncApi.endpoint = config.operatorSync.endpoint;
}
