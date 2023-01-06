import { defineConfig } from "tsup";

import { plugins } from "~/scripts/esbuild";

export default defineConfig({
	clean: true,
	dts: true,
	entry: ["src/index.ts"],
	outDir: "dist",
	format: ["cjs", "esm"],
	minify: true,
	treeshake: true,
	tsconfig: "tsconfig.json",
	splitting: true,
	sourcemap: true,
	esbuildPlugins: plugins,
});
