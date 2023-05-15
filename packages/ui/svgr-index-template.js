const path = require("path");
const { pascalCase } = require("pascal-case");

function defaultIndexTemplate(files) {
	const exportEntries = files.map((file) => {
		const basename = path.basename(file.path, path.extname(file.path));
		const exportName = /^.+logo$/i.test(basename)
			? pascalCase(basename)
			: `${pascalCase(basename)}Icon`;
		return `export { default as ${exportName} } from './${basename}'`;
	});
	return exportEntries.join("\n");
}

module.exports = defaultIndexTemplate;
