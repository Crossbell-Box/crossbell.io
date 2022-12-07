import { operatorSyncApi } from "@/components/connectkit";

import config from "../../config";

if (config.operatorSync.endpoint) {
	operatorSyncApi.endpoint = config.operatorSync.endpoint;
}
