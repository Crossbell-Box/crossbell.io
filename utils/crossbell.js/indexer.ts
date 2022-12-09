import { Indexer } from "crossbell.js";

import config from "../../config";

const isProductionServer =
	typeof window === "undefined" && process.env.NODE_ENV === "production";

export const indexer = new Indexer(
	isProductionServer ? config.indexer.endpoint : undefined
);
