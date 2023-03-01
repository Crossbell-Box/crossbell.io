import { NextConfig } from "next";
import configNextra from "nextra";
import { withIpfsGateway } from "@crossbell/ipfs-gateway-next";

import { withLocalPackages } from "~/scripts/nextjs/with-local-packages";

const withNextra = configNextra({
	theme: "nextra-theme-docs",
	themeConfig: "./src/theme.config.tsx",
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

module.exports = withNextra(withIpfsGateway(withLocalPackages(nextConfig)));
