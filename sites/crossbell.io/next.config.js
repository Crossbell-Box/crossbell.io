const UnoCSS = require("@unocss/webpack").default;
const { withIpfsGateway } = require("@crossbell/ipfs-gateway-next");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});
const { withLocalPackages } = require("../../utils/nextjs/with-local-packages");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [{ hostname: "**" }],
	},
	webpack: (config) => {
		config.plugins.push(UnoCSS());
		// config.cache = false;
		return config;
	},
	experimental: {
		scrollRestoration: true,
	},
	compiler: {
		// removeConsole: { exclude: ["error"] },
	},
	rewrites: async () => {
		return [
			{
				source: "/sitemap.xml",
				destination:
					"https://raw.githubusercontent.com/Crossbell-Box/io-sitemap/main/sitemaps/sitemap-index.xml",
			},
			{
				source: "/sitemap-:match*.xml",
				destination:
					"https://raw.githubusercontent.com/Crossbell-Box/io-sitemap/main/sitemaps/sitemap-:match*.xml",
			},
			{
				source: "/robots.txt",
				destination:
					"https://raw.githubusercontent.com/Crossbell-Box/io-sitemap/main/sitemaps/robots.txt",
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/treasures/:slug*",
				destination: "/shop/:slug*",
				permanent: true,
			},
		];
	},
};

module.exports = withBundleAnalyzer(
	withIpfsGateway(withLocalPackages(nextConfig))
);
