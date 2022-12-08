const { default: UnoCSS } = require("@unocss/webpack");
const { withIpfsGateway } = require("@crossbell/ipfs-gateway-next");
const {
	withLocalPackages,
} = require("../../scripts/nextjs/with-local-packages");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		externalDir: true,
	},
	webpack: (config) => {
		config.plugins.push(UnoCSS());
		config.cache = false;
		return config;
	},
};

module.exports = withIpfsGateway(withLocalPackages(nextConfig));
