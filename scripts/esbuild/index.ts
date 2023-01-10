import { Plugin } from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";

export const plugins: Plugin[] = [cssModulesPlugin()];
