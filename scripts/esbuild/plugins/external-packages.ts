import { Plugin } from "esbuild";

export const makeAllPackagesExternalPlugin: Plugin = {
	name: "make-all-packages-external",
	setup(build) {
		const filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/; // Must not start with "/" or "./" or "../"
		build.onResolve({ filter }, (args) => {
			if (args.path.startsWith("~/")) return;

			return {
				path: args.path,
				external: true,
			};
		});
	},
};
