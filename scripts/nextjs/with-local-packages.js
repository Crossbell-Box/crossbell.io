const fs = require("fs");
const path = require("path");
const nextTranspileModules = require("next-transpile-modules");

const PACKAGES_DIR = path.join(__dirname, "../../packages");

exports.withLocalPackages = nextTranspileModules(
	fs
		.readdirSync(PACKAGES_DIR)
		.map((dir) => {
			const pkgDir = path.join(PACKAGES_DIR, dir);
			const pkgDirStat = fs.lstatSync(pkgDir);

			if (pkgDirStat.isDirectory()) {
				return path.resolve(__dirname, pkgDir);
			}
		})
		.filter(Boolean)
);
