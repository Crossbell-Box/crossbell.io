export default {
	indexer: {
		endpoint:
			process.env.INDEXER_ENDPOINT ?? "http://indexer-v1-api.crossbell:3000/v1",
	},
} as const;
