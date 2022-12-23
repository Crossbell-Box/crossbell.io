const fs = require("fs");
const path = require("path");
const nextTranspileModules = require("next-transpile-modules");

const PACKAGES_DIR = path.join(__dirname, "../../packages");
const SITES_DIR = path.join(__dirname, "../../sites");

export const withLocalPackages = nextTranspileModules([
	...getPackages(PACKAGES_DIR),
	...getPackages(SITES_DIR),
]);

function getPackages(rootPath: string) {
	return fs
		.readdirSync(rootPath)
		.map((dir: string) => {
			const pkgDir = path.join(rootPath, dir);
			const pkgDirStat = fs.lstatSync(pkgDir);

			if (pkgDirStat.isDirectory()) {
				return path.resolve(__dirname, pkgDir);
			}
		})
		.filter(Boolean);
}
