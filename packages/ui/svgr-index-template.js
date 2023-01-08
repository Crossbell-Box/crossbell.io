const path = require("path");
const { pascalCase } = require("pascal-case");

function defaultIndexTemplate(filePaths) {
	const exportEntries = filePaths.map((filePath) => {
		const basename = path.basename(filePath, path.extname(filePath));
		const exportName = `${pascalCase(basename)}Icon`;
		return `export { default as ${exportName} } from './${basename}'`;
	});
	return exportEntries.join("\n");
}

module.exports = defaultIndexTemplate;
