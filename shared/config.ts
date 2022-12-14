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

	xChar: {
		domain: process.env.X_CHAR_WEBSITE || "https://xchar.app",
	},

	xFeed: {
		domain: process.env.X_FEED_WEBSITE || "https://crossbell.io/feed",
	},

	xShop: {
		domain: process.env.X_SHOP_WEBSITE || "https://crossbell.io/shop",
	},
} as const;
