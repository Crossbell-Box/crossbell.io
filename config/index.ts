export default {
	indexer: {
		endpoint: process.env.INDEXER_ENDPOINT,
	},
	operatorSync: {
		endpoint:
			process.env.OPERATOR_SYNC_ENDPOINT ?? process.env.NODE_ENV == "production"
				? "https://opsync.crossbell.io/v1"
				: "https://test-opsync.crossbell.io/v1",
	},
} as const;
