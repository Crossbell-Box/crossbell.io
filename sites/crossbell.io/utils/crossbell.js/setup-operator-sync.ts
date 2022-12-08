import { operatorSyncApi } from "@crossbell/connect-kit";

import config from "~/shared/config";

if (config.operatorSync.endpoint) {
	operatorSyncApi.endpoint = config.operatorSync.endpoint;
}
