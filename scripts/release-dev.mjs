import "zx/globals";

const isWorkingDirectoryClean = !String(await $`git status --short`);

if (isWorkingDirectoryClean) {
	await $`yarn run build:all`;
	// Bump dev version
	await $`lerna version \"$(node ./scripts/get-current-version.js)-dev-$(date +%s)\" --no-git-tag-version --force-publish --yes`;
	// Save Temporary changes
	await $`git add . && git commit -m 'release-dev'`;
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
