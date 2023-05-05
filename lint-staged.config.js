module.exports = {
	"**/package.json": ["pnpm format:package"],
	"*.{js,ts,tsx,html,json}": ["prettier --write", "eslint --fix"],
};
