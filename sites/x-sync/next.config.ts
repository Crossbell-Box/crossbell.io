import { NextConfig } from "next";
import UnoCSS from "@unocss/webpack";
import { withIpfsGateway } from "@crossbell/ipfs-gateway-next";

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

module.exports = withIpfsGateway(nextConfig);
