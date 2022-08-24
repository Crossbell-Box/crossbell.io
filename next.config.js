const UnoCSS = require("@unocss/webpack").default;
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
	swcMinify: true,
};

module.exports = withBundleAnalyzer(nextConfig);
