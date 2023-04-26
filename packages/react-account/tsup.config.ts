import { defineConfig } from "tsup";
import packageInfo from "./package.json";

import { plugins } from "~/scripts/esbuild";

export default defineConfig({
	clean: true,
	dts: true,
	entry: {
		index: "src/index.ts",
		utils: "src/utils/index.ts",
		apis: "src/apis/index.ts",
		["modal-config"]: "src/modal-config.ts",
		["storage-config"]: "src/storage-config.ts",
	},
	outDir: "dist",
	format: ["cjs", "esm"],
	minify: true,
	treeshake: true,
	tsconfig: "tsconfig.json",
	splitting: true,
	sourcemap: true,
	metafile: true,
	esbuildPlugins: plugins,
	esbuildOptions(options) {
		options.define = {
			...options.define,
			"process.env.PKG_VERSION": JSON.stringify(packageInfo.version),
		};
	},
});
