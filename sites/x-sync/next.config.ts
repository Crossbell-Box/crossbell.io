import { NextConfig } from "next";
import UnoCSS from "@unocss/webpack";
import { withIpfsGateway } from "@crossbell/ipfs-gateway-next";
import { withLocalPackages } from "~/scripts/nextjs/with-local-packages";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	experimental: {
		externalDir: true,
	},
	webpack: (config) => {
		config.plugins.push(UnoCSS());
		return config;
	},
};

module.exports = withIpfsGateway(withLocalPackages(nextConfig));
