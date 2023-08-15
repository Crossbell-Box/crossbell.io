import { NextConfig } from "next";
import UnoCSS from "@unocss/webpack";
import { withIpfsGateway } from "@crossbell/ipfs-gateway-next";
import nextBundleAnalyzer from "@next/bundle-analyzer";

import config from "~/shared/config";

const withBundleAnalyzer = nextBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [{ hostname: "**" }],
	},
	webpack: (config) => {
		config.plugins.push(UnoCSS());
		return config;
	},
	experimental: {
		scrollRestoration: true,
		externalDir: true,
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
			{
				source: "/sync",
				destination: config.xSync.domain,
				permanent: false,
			},
		];
	},
};

module.exports = withBundleAnalyzer(withIpfsGateway(nextConfig));
