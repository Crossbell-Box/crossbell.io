const fs = require("fs");
const path = require("path");
const nextTranspileModules = require("next-transpile-modules");

const PACKAGES_DIR = path.join(__dirname, "../../packages");
const SITES_DIR = path.join(__dirname, "../../sites");

exports.withLocalPackages = nextTranspileModules([
	...getPackages(PACKAGES_DIR),
	...getPackages(SITES_DIR),
]);

function getPackages(rootPath) {
	return fs
		.readdirSync(rootPath)
		.map((dir) => {
			const pkgDir = path.join(rootPath, dir);
			const pkgDirStat = fs.lstatSync(pkgDir);

			if (pkgDirStat.isDirectory()) {
				return path.resolve(__dirname, pkgDir);
			}
		})
		.filter(Boolean);
}
