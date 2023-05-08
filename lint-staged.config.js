module.exports = {
	"**/package.json": ["yarn format:package"],
	"*.{js,ts,tsx,html,json}": ["prettier --write", "eslint --fix"],
};
