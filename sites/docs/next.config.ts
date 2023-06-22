import { NextConfig } from "next";
import configNextra from "nextra";
import { withIpfsGateway } from "@crossbell/ipfs-gateway-next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

const withNextra = configNextra({
	theme: "nextra-theme-docs",
	themeConfig: "./src/theme.config.tsx",
	defaultShowCopyCode: true,
});

const nextConfig: NextConfig = {
	reactStrictMode: true,

	experimental: {
		externalDir: true,
	},

	async redirects() {
		return [
			{
				source: "/",
				destination: "/docs",
				permanent: false,
			},
		];
	},
};

module.exports = withBundleAnalyzer(withNextra(withIpfsGateway(nextConfig)));
