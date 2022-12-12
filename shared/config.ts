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
	domain:
		process.env.DOMAIN_NAME ?? process.env.NODE_ENV == "production"
			? "https://crossbell.io"
			: "http://localhost:3000",

	xSync: {
		domain: process.env.X_SYNC_WEBSITE || "https://xsync.app",
	},
} as const;
