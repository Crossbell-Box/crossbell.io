const UnoCSS = require("@unocss/webpack").default;
const { withIpfsGateway } = require('@crossbell/ipfs-gateway-next')
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
	compiler: {
		// removeConsole: { exclude: ["error"] },
	},
	// swcMinify: true,
	rewrites: async () => {
		return [
			{
				source: "/sitemap.xml",
				destination:
					"https://raw.githubusercontent.com/Crossbell-Box/io-sitemap/main/sitemaps/sitemap-index.xml",
			},
			{
				source: "/sitemaps/:match*",
				destination:
					"https://raw.githubusercontent.com/Crossbell-Box/io-sitemap/main/sitemaps/:match*",
			},
			{
				source: "/robots.txt",
				destination:
					"https://raw.githubusercontent.com/Crossbell-Box/io-sitemap/main/sitemaps/robots.txt",
			},
		];
	},
};

module.exports = withBundleAnalyzer(withIpfsGateway(nextConfig));
