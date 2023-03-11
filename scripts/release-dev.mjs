import "zx/globals";

const isWorkingDirectoryClean = !String(await $`git status --short`);
const devVersion = `0.0.${Date.now()}-dev`;

if (isWorkingDirectoryClean) {
	// Bump dev version
	await $`lerna version "${devVersion}" --no-git-tag-version --force-publish --yes`;
	// Save Temporary changes
	await $`git add . && git commit -m 'release-dev'`;
	// Build
	await $`yarn run build`;
	// Publish to `dev` tag
	try {
		await $`lerna publish from-package --yes --no-private --dist-tag dev`;
	} finally {
		// Remove temporary changes
		await $`git reset --hard HEAD^`;
	}
} else {
	console.log("🔴 Commit your changes first!");
	process.exit(1);
}
