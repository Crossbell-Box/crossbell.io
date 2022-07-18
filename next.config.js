const UnoCSS = require("@unocss/webpack").default;

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			// { source: "/feed", destination: "/app/feed" },
			// { source: "/sync", destination: "/app/sync" },
			// { source: "/shop", destination: "/app/shop" },
			// { source: "/:handle*", destination: "/app/:handle*" },
			// { source: "/notes/:id*", destination: "/app/notes/:id*" },
			// { source: "/wallet/:slug*", destination: "/app/wallet/:slug*" },
			{ source: "/:slug*", destination: "/app/:slug*" },
		];
	},
	webpack: (config) => {
		config.plugins.push(UnoCSS());
		// config.cache = false;
		return config;
	},
	experimental: {
		scrollRestoration: true,
		images: {
			allowFutureImage: true,
			remotePatterns: [{ hostname: "**" }],
		},
	},
};

module.exports = nextConfig;
